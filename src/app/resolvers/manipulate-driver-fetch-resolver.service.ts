import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authenticate';
import {TestCaseService} from '../services/test-case.service';
import {EMPTY, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManipulateDriverFetchResolverService implements Resolve<any> {

  constructor(private authenticationSerivce: AuthenticationService, private manipulateSerivce: TestCaseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.manipulateSerivce.findAllTest(0, 2000);
  }
}
