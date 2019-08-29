import {Component, OnInit} from '@angular/core';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-role-management-create',
  templateUrl: './role-management-create.component.html',
  styleUrls: ['./role-management-create.component.scss']
})
export class RoleManagementCreateComponent implements OnInit {

  roles: any[] = [];

  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
  }

  saveRole() {
    let count = 0;
    this.roles.forEach(item => {
      if (item.name.indexOf('ROLE_') !== 0) {
        this.roles[count].name = 'ROLE_' + item.name;
      }
      count++;
    });

    this.roleService.save(this.roles).subscribe();
  }

  addNewRole() {
    this.roles.push({name: ''});
  }

  removeRole(role: any) {
    this.roles = this.roles.filter(el => el.name !== role.name);
  }

  deleteRole(id: string) {
    this.roleService.delete(id).subscribe();
  }

}
