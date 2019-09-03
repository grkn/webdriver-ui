import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = {
    emailAddress: '',
    accountName: '',
    id: '',
    accountPhrase: '',
    accessToken: null,
    lastName: '',
    middleName: '',
    name: '',
    userAuthorization: [],
    birthDay: new Date(),
    project: undefined,
    companyId: '',
    companyName: ''
  };

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.user.emailAddress && this.user.accountPhrase) {
      this.userService.register(this.user.companyName, this.user).subscribe(res => {
        this.router.navigate(['login']);
      });
    }
  }

}
