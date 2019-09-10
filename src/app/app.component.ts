import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authenticate';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {User} from './models/user';
import {TestProjectService} from './services/test-project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  hideExplanation: boolean = false;
  projects: any = [];
  user: User;
  @ViewChild(SideNavBarComponent, {static: false})
  sideNavBar: SideNavBarComponent;
  @ViewChild('projectId', {static: true})
  projectId: any;
  selectedProject: any = {};

  constructor(private authenticateService: AuthenticationService, private testProjectService: TestProjectService) {
    this.authenticateService.user.subscribe(user => {
      if (user && user.id) {
        this.hideExplanation = true;
      } else {
        this.hideExplanation = false;
      }
      this.user = user;
      this.findAllProjects();
    });


    this.authenticateService.projects.subscribe(createProject => {
      if (createProject) {
        this.projects.push(createProject);
      }
    });
  }

  logout() {
    this.authenticateService.logout();
    this.projectId.placeholder = 'Select Project';
    this.projectId.value = undefined;
    if (this.sideNavBar) {
      this.sideNavBar.disableMenu();
    }
  }

  selectProject($event) {
    this.authenticateService.setProject($event.value);
    window.location.reload();
  }

  ngAfterViewInit(): void {
    this.selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    if (this.selectedProject) {
      this.projectId.placeholder = this.selectedProject.name;
    } else {
      this.projectId.placeholder = 'Select Project';
    }
  }

  ngOnInit(): void {
    this.findAllProjects();
  }

  findAllProjects() {
    if (this.authenticateService.currentUserValue && this.authenticateService.currentUserValue.id) {
      this.testProjectService.findAll(this.authenticateService.currentUserValue.id).subscribe(res => this.projects = res);
    }
  }
}
