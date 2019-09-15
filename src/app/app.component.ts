import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authenticate';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {User} from './models/user';
import {TestProjectService} from './services/test-project.service';
import {ScrollPanel} from 'primeng/primeng';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  hideExplanation: boolean = false;
  projects: any = [];
  user: User;
  @ViewChild(SideNavBarComponent, {static: false})
  sideNavBar: SideNavBarComponent;
  @ViewChild('projectId', {static: true})
  projectId: any;
  selectedProject: any = {};

  public menuInactiveDesktop: boolean;

  public menuActiveMobile: boolean;

  public profileActive: boolean;

  public topMenuActive: boolean;

  public topMenuLeaving: boolean;

  @ViewChild('scroller', {static: true}) public scrollerViewChild: ScrollPanel;

  documentClickListener: () => void;

  menuClick: boolean;

  topMenuButtonClick: boolean;


  constructor(private authenticateService: AuthenticationService, private testProjectService: TestProjectService
    , public renderer: Renderer2) {
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

    setTimeout(() => {
      this.scrollerViewChild.moveBar();
    }, 100);

    // hides the overlay menu and top menu if outside is clicked
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.isDesktop()) {
        if (!this.menuClick) {
          this.menuActiveMobile = false;
        }

        if (!this.topMenuButtonClick) {
          this.hideTopMenu();
        }
      }

      this.menuClick = false;
      this.topMenuButtonClick = false;
    });
  }

  ngOnInit(): void {
    this.findAllProjects();
  }

  findAllProjects() {
    if (this.authenticateService.currentUserValue && this.authenticateService.currentUserValue.id) {
      this.testProjectService.findAll(this.authenticateService.currentUserValue.id).subscribe(res => this.projects = res);
    }
  }

  toggleMenu(event: Event) {
    this.menuClick = true;
    if (this.isDesktop()) {
      this.menuInactiveDesktop = !this.menuInactiveDesktop;
      if (this.menuInactiveDesktop) {
        this.menuActiveMobile = false;
      }
    } else {
      this.menuActiveMobile = !this.menuActiveMobile;
      if (this.menuActiveMobile) {
        this.menuInactiveDesktop = false;
      }
    }

    if (this.topMenuActive) {
      this.hideTopMenu();
    }

    event.preventDefault();
  }

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 500);
  }

  onMenuClick() {
    this.menuClick = true;

    setTimeout(() => {
      this.scrollerViewChild.moveBar();
    }, 500);
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  onSearchClick() {
    this.topMenuButtonClick = true;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
