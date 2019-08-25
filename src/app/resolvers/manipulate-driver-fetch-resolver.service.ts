import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authenticate';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {EMPTY, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManipulateDriverFetchResolverService implements Resolve<any> {

  constructor(private authenticationSerivce: AuthenticationService, private manipulateSerivce: ManipulateServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.manipulateSerivce.findAllTest(this.authenticationSerivce.currentUserValue.id, 0, 1000);
  }
}
