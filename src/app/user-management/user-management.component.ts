import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {DialogService} from 'primeng/api';
import {AddRoleToUserComponent} from '../add-role-to-user/add-role-to-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  totalElements: number;
  event: any;

  constructor(private userService: UserService, private dialogService: DialogService) {
  }

  ngOnInit() {
  }

  loadUsersLazy($event: any) {
    this.event = $event;
    const page = parseInt($event.first) / parseInt($event.rows);
    const size = parseInt($event.rows);
    this.userService.findAllUsers(page, size).subscribe(res => {
      this.users = res.content;
      this.totalElements = res.totalElements;
    });
  }

  deleteById(id: string) {
    this.userService.deleteById(id).subscribe(res => this.loadUsersLazy(this.event));
  }

  show(id: any) {
    const ref = this.dialogService.open(AddRoleToUserComponent, {
      data: {
        id
      },
      header: 'Choose a Role',
      width: '30%'
    });

    ref.onClose.subscribe((role: any) => {
      if (role) {
        this.userService.addRoleToUser(id, role).subscribe(res => {
          this.loadUsersLazy(this.event)
        });
      }
    });
  }

}
