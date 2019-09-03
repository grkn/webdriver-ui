import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authenticate';

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
    birthDay: new Date(),
    project: undefined,
    companyId: '',
    companyName: ''
  };

  constructor(private userService: UserService, private toastr: ToastrService, private authService: AuthenticationService,
              private router: Router, private activeRoute: ActivatedRoute) {
    activeRoute.data.subscribe(item => {
      if (item && item.editResolver) {
        this.user = item.editResolver;
      }
    });
  }

  ngOnInit() {
  }

  saveUser() {
    if (this.user.id) {
      this.userService.edit(this.user).subscribe(res => {
        this.toastr.success('User is edited successfully');
        this.router.navigate(['usermanagement']);
      });
    } else {
      this.userService.save(this.user, this.authService.currentUserValue.companyId).subscribe(res => {
        this.toastr.success('User is created successfully');
        this.router.navigate(['usermanagement']);
      });
    }

  }
}
