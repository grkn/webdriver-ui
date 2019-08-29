import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {UserManagementComponent} from '../user-management/user-management.component';
import {RoleService} from '../services/role.service';

@Component({
  templateUrl: './add-role-to-user.component.html',
  providers: [DialogService]
})
export class AddRoleToUserComponent implements OnInit {
  totalElements: number;
  roles: any;

  constructor(private roleService: RoleService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
  }


  loadRolesLazy($event: any) {
    this.roleService.findAll($event.first / $event.rows, $event.rows).subscribe(res => {
      this.totalElements = res.totalElements;
      this.roles = res.content;
    });
  }

  selectRole(role: any) {
    if (role) {
      this.ref.close(role);
    } else {
      this.ref.close(null);
    }
  }

}
