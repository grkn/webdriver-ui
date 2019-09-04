import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authenticate';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {TestSuiteService} from '../services/test-suite.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isProjectSelected = false;
  testcaseCount: Observable<any>;
  testSuiteCount: Observable<any>;

  constructor(private authenticateService: AuthenticationService, private manipulateService: ManipulateServiceService,
              private testsuiteService: TestSuiteService) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    if (selectedProject) {
      this.isProjectSelected = true;
    }
  }

  ngOnInit() {
    this.testcaseCount = this.manipulateService.getTestCaseCount();
    this.testSuiteCount = this.testsuiteService.getTestSuiteCount();
  }



}
