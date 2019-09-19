import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestSuiteService} from '../services/test-suite.service';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteDetailResolverService implements Resolve<any> {

  constructor(private testSuiteService: TestSuiteService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.testSuiteService.findTestBySuiteId(route.paramMap.get('id'));
  }
}
