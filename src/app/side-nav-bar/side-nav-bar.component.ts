import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../services/authenticate';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  @Input() elementRef: any;
  model: MenuItem[] = [];

  constructor(private authenticateService: AuthenticationService) {
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
      label: 'User Management',
      items: [
        {label: 'List User', icon: 'pi pi-fw pi-list', routerLink: ['usermanagement']},
        {label: 'Add User', icon: 'pi pi-fw pi-plus', routerLink: ['usermanagement', 'create']},
        {label: 'List Role', icon: 'pi pi-fw pi-list', routerLink: ['usermanagement', 'role']},
        {label: 'Add Role', icon: 'pi pi-fw pi-plus', routerLink: ['usermanagement', 'role', 'create']}
      ]
    });
  }

  ngOnInit() {

  }
}
