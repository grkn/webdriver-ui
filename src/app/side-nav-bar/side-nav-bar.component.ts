import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../services/authenticate';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  model: MenuItem[] = [];

  constructor(private authenticateService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticateService.user.subscribe(user => {
      if (user && user.id) {
        this.prepareMenu();
      }
    });

  }

  public disableMenu() {
    this.model = [];
  }

  prepareMenu() {
    if (this.authenticateService.currentUserValue) {
      this.model = [];
      this.model.push({
        label: 'Dashboard',
        routerLink: ['dashboard']
      });

      this.model.push({
        label: 'Test Cases',
        items: [
          {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['testcases']},
          {label: 'Create', icon: 'pi pi-fw pi-plus', routerLink: ['testcases', 'create']}
        ]
      });

      this.model.push({
        label: 'Test Suite',
        items: [
          {label: 'Suite', icon: 'pi pi-fw pi-list', routerLink: ['testsuites']}
        ]
      });

      this.model.push({
        label: 'Driver',
        routerLink: ['driver']
      });
      if (this.authenticateService.currentUserValue.userAuthorization
          .filter(auth => auth.authorization.indexOf('ROLE_ADMIN') === 0).length > 0
        || this.authenticateService.currentUserValue.userAuthorization
          .filter(auth => auth.authorization.indexOf('ROLE_ROOT') === 0).length > 0) {

        this.model.push({
          label: 'User Management',
          items: [
            {label: 'List User', icon: 'pi pi-fw pi-list', routerLink: ['usermanagement']},
            {label: 'Add User', icon: 'pi pi-fw pi-plus', routerLink: ['usermanagement', 'create']},
            {label: 'List Role', icon: 'pi pi-fw pi-list', routerLink: ['usermanagement', 'role']},
            {label: 'Add Role', icon: 'pi pi-fw pi-plus', routerLink: ['usermanagement', 'role', 'create']}
          ]
        });

        this.model.push({
          label: 'Test Project',
          items: [
            {label: 'List Project', icon: 'pi pi-fw pi-list', routerLink: ['testproject']},
            {label: 'Create Project', icon: 'pi pi-fw pi-plus', routerLink: ['testproject', 'create']},
          ]
        });
      }
    }
  }
}
