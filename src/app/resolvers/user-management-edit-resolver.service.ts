import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementEditResolverService implements Resolve<User> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.findById(route.paramMap.get('id'));
  }
}
