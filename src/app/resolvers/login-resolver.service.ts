import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authenticate';

@Injectable({
  providedIn: 'root'
})
export class LoginResolverService implements Resolve<User> {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['login'], {queryParams: {redirectUrl: route.url[0].path}});
      return EMPTY;
    }
    return of(this.authenticationService.currentUserValue);
  }
}
