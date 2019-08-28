import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  totalElements: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  loadUsersLazy($event: any) {
    const page = parseInt($event.first) / parseInt($event.rows);
    const size = parseInt($event.rows);
    this.userService.findAllUsers(page, size).subscribe(res => {
      this.users = res.content;
      this.totalElements = res.totalElements;
    });
  }

  deleteById(id: string) {
    this.userService.deleteById(id).subscribe();
  }
}
