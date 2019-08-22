import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authenticate';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  user: User;

  constructor(public authenticateService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticateService.login(this.username, this.password).subscribe(user => {
      if (user) {
        this.user = this.authenticateService.currentUserValue;
      }
    });

  }
}
