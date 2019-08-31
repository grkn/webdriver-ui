import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authenticate';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hideExplanation: boolean = false;
  user: User;
  @ViewChild(SideNavBarComponent, {static: false})
  sideNavBar: SideNavBarComponent;

  constructor(private authenticateService: AuthenticationService) {
    this.authenticateService.user.subscribe(user => {
      if (user && user.id) {
        this.hideExplanation = true;
      } else {
        this.hideExplanation = false;
      }
      this.user = user;
    });
  }

  logout() {
    this.authenticateService.logout();
    if (this.sideNavBar) {
      this.sideNavBar.disableMenu();
    }
  }
}
