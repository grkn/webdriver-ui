import {Component, OnInit} from '@angular/core';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-role-management-list',
  templateUrl: './role-management-list.component.html',
  styleUrls: ['./role-management-list.component.scss']
})
export class RoleManagementListComponent implements OnInit {
  roles: any = [];
  totalElements: number;
  event: any;
  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
  }

  loadRolesLazy($event: any) {
    this.event = $event;
    this.roleService.findAll($event.first / $event.rows, $event.rows).subscribe(res => {
      this.totalElements = res.totalElements;
      this.roles = res.content;
    });
  }

  deleteById(id:string) {
    this.roleService.delete(id).subscribe(res => this.loadRolesLazy(this.event));
  }
}
