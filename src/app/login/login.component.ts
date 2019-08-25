import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public authenticateService: AuthenticationService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authenticateService.login(this.username, this.password).subscribe(user => {
      this.route.queryParams.subscribe(params => {
        const redirectUrl = params.redirectUrl;
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        }
      });
    });
  }
}
