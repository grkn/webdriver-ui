import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestSuiteService} from '../services/test-suite.service';
import {AuthenticationService} from '../services/authenticate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteRunHistoryDetailResolverService implements Resolve<any> {

  constructor(private testSuiteService: TestSuiteService, private authenticationService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.testSuiteService.findTestBySuiteIdAndUserId(
      this.authenticationService.currentUserValue.id, route.paramMap.get('testsuiteId')).pipe(map(item => {
      item.forEach(element => element.runId = route.paramMap.get('runId'));
      return item;
    }));
  }

}
