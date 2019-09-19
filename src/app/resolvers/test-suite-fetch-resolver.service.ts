import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestCaseService} from '../services/test-case.service';
import {TestSuiteService} from '../services/test-suite.service';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteFetchResolver implements Resolve<any> {

  constructor(private testsuiteService: TestSuiteService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.testsuiteService.findAll(0, 10);
  }
}

