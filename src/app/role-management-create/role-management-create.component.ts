import {Component, OnInit} from '@angular/core';
import {RoleService} from '../services/role.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-role-management-create',
  templateUrl: './role-management-create.component.html',
  styleUrls: ['./role-management-create.component.scss']
})
export class RoleManagementCreateComponent implements OnInit {

  roles: any[] = [];

  constructor(private roleService: RoleService, private toastr: ToastrService) {
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

    this.roleService.save(this.roles).subscribe(item => {
      this.toastr.success('Role Saved Successfully');
    });
  }

  addNewRole() {
    this.roles.push({name: ''});
  }

  removeRole(role: any) {
    this.roles = this.roles.filter(el => el !== role);
  }
}
