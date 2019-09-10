import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestCaseService} from '../services/test-case.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunTestDetailResolverService implements Resolve<any> {

  constructor(private testCaseService: TestCaseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.testCaseService.getRunningInstanceUnderProjectById(route.paramMap.get('id'));
  }
}
