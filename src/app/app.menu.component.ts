import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {AuthenticationService} from './services/authenticate';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';

@Component({
  selector: 'app-menu',
  template: `
    <div class="menu">
      <ul app-submenu [item]="model" root="true" parentActive="true"></ul>
    </div>
  `
})
export class AppMenuComponent implements OnInit {

  model: MenuItem[];

  constructor(private authenticateService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.authenticateService.currentUserValue) {
      this.model = [];
      this.model.push({
        label: 'Dashboard',
        routerLink: ['dashboard']
      });

      if (this.authenticateService.currentUserValue.userAuthorization
          .filter(auth => auth.authorization.indexOf('ROLE_ADMIN') === 0).length > 0
        || this.authenticateService.currentUserValue.userAuthorization
          .filter(auth => auth.authorization.indexOf('ROLE_ROOT') === 0).length > 0) {
        this.model.push({
          label: 'Projects',
          items: [
            {label: 'List Project', icon: 'pi pi-fw pi-list', routerLink: ['testproject']},
            {label: 'Create Project', icon: 'pi pi-fw pi-plus', routerLink: ['testproject', 'create']},
          ],
        });
      }

      this.model.push({
        label: 'Browser Drivers',
        routerLink: ['driver']
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
        label: 'Test Reports',
        items: [
          {label: 'Test Suite Reports', icon: 'pi pi-fw pi-list', routerLink: ['suiterunhistory']},
          {label: 'Test Case Reports', icon: 'pi pi-fw pi-plus', routerLink: ['testsuitesrun']}
        ]
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
      }
    }
  }


}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
    <ul>
      <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
        <li [ngClass]="{'active-menuitem': isActive(i), 'ui-state-disabled':child.disabled}" [class]="child.badgeStyleClass">
          <a *ngIf="!child.routerLink" [href]="child.url||'#'" (click)="itemClick($event,child,i)"
             [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
            <i [ngClass]="child.icon"></i>
            <span>{{child.label}}</span>
            <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
            <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
          </a>
          <a *ngIf="child.routerLink" (click)="itemClick($event,child,i)" [attr.target]="child.target"
             [routerLink]="!child.disabled?child.routerLink:null" routerLinkActive="active-menuitem-routerlink"
             [routerLinkActiveOptions]="{exact: true}">
            <i [ngClass]="child.icon"></i>
            <span>{{child.label}}</span>
            <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
            <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
          </a>
          <ul app-submenu [item]="child" *ngIf="child.items"
              [@children]="isActive(i) ? 'visible' : 'hidden'" [parentActive]="isActive(i)"></ul>
        </li>
      </ng-template>
    </ul>
  `,
  animations: [
    trigger('children', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  activeIndex: number;

  _parentActive: boolean;

  constructor(public app: AppComponent, private authenticateService: AuthenticationService) {
  }

  itemClick(event: Event, item: MenuItem, index: number) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.activeIndex = (this.activeIndex === index) ? null : index;

    // execute command
    if (item.command) {
      item.command({originalEvent: event, item});
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      setTimeout(() => {
        this.app.scrollerViewChild.moveBar();
      }, 400);
      event.preventDefault();
    }

    if (!item.items) {
      this.app.menuActiveMobile = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }
}
