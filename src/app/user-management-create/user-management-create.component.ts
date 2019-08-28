import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-management-create',
  templateUrl: './user-management-create.component.html',
  styleUrls: ['./user-management-create.component.scss']
})
export class UserManagementCreateComponent implements OnInit {

  user: User = {
    emailAddress: '',
    accountName: '',
    id: '',
    accountPhrase: '',
    accessToken: '',
    lastName: '',
    middleName: '',
    name: '',
    userAuthorization: [],
    birthDay: new Date()
  };

  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  saveUser() {
    this.userService.save(this.user).subscribe(res => {
      this.toastr.success('User created successfully');
    });
  }
}
