import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authenticate';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {User} from './models/user';
import {TestProjectService} from './services/test-project.service';
import {ScrollPanel, SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  hideNavBar: boolean = false;
  projects: SelectItem[] = [];
  user: User;

  @ViewChild('projectId', {static: true})
  projectId: any;
  selectedProject: SelectItem = {label: '', value: ''};

  public menuInactiveDesktop: boolean;

  public menuActiveMobile: boolean;

  public profileActive: boolean;

  public topMenuActive: boolean;

  public topMenuLeaving: boolean;

  @ViewChild('scroller', {static: true}) public scrollerViewChild: ScrollPanel;

  documentClickListener: () => void;

  menuClick: boolean;

  topMenuButtonClick: boolean;


  constructor(private authenticateService: AuthenticationService, private testProjectService: TestProjectService, private renderer: Renderer2) {
    this.authenticateService.user.subscribe(user => {
      if (user && user.id) {
        this.hideNavBar = true;
      } else {
        this.hideNavBar = false;
      }
      this.user = user;
      this.findAllProjects();
    });

    this.authenticateService.projects.subscribe(createProject => {
      if (createProject) {
        const selectItem: SelectItem = {label: createProject.name, value: createProject}
        this.projects.push(selectItem);
        this.selectedProject = {label: createProject.name, value: createProject};
      }
    });

  }

  selectProject($event) {
    this.authenticateService.setProject($event.value);
    window.location.reload();
  }

  ngAfterViewInit(): void {


    setTimeout(() => {
      if (this.scrollerViewChild) {
        this.scrollerViewChild.moveBar();
      }
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
      this.testProjectService.findAll(this.authenticateService.currentUserValue.id).subscribe(res => {
        if (res) {
          this.projects = [];
          const prject = JSON.parse(localStorage.getItem('selectedProject'));
          res.forEach(prj => {
            const selectItem = {label: prj.name, value: prj};
            this.projects.push(selectItem);
            if (prject && prj.id === prject.id) {
              this.selectedProject = selectItem;
            }
          });
        }
      });
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
      if (this.scrollerViewChild) {
        this.scrollerViewChild.moveBar();
      }
    }, 500);
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  logout() {
    this.authenticateService.logout();
  }
}
