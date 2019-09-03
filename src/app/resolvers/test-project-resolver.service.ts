import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestProjectService} from '../services/test-project.service';
import {AuthenticationService} from '../services/authenticate';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestProjectResolverService implements Resolve<any> {

  constructor(private testProjectService: TestProjectService, private authenticateService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.testProjectService.findById(route.paramMap.get('id'), this.authenticateService.currentUserValue.id);
  }
}
