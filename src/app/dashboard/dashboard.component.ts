import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authenticate';
import {TestCaseService} from '../services/test-case.service';
import {TestSuiteService} from '../services/test-suite.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  isProjectSelected = false;
  testcaseCount: Observable<any>;
  testSuiteCount: Observable<any>;
  testCaseCountPieChart: number;
  testSuiteCountPieChart: number;
  clearIds: any[] = [];

  constructor(private authenticateService: AuthenticationService, private manipulateService: TestCaseService,
              private testsuiteService: TestSuiteService) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    if (selectedProject) {
      this.isProjectSelected = true;
    }
  }

  ngOnInit() {
    this.testcaseCount = this.manipulateService.getTestCaseCount();
    this.testSuiteCount = this.testsuiteService.getTestSuiteCount();
    this.testSuiteCount.subscribe(res => {
      this.testSuiteCountPieChart = res;
      this.testcaseCount.subscribe(testCaseCount => {
        this.testCaseCountPieChart = testCaseCount;
        const mockChart = document.getElementById('mockChart');
        window['mockChart'](mockChart, this.testSuiteCountPieChart, this.testCaseCountPieChart);
      });
    });

    this.testCaseInterval();
    this.testSuiteInterval();
    this.mockChartInterval();

  }

  ngOnDestroy(): void {
    this.clearIds.forEach((item: any) => {
      clearInterval(item);
    });
  }

  mockChartInterval() {
    const clearId = setInterval(() => {
      const mockChart = document.getElementById('mockChart');
      window['mockChart'](mockChart, this.testSuiteCountPieChart, this.testCaseCountPieChart);
    }, 15000);
    this.clearIds.push(clearId);
  }

  testCaseInterval() {
    const clearId = setInterval(() => {
      this.testcaseCount = this.manipulateService.getTestCaseCount();
      this.testcaseCount.subscribe(res => this.testCaseCountPieChart = res);
    }, 20000);
    this.clearIds.push(clearId);
  }

  testSuiteInterval() {
    const clearId = setInterval(() => {
      this.testSuiteCount = this.testsuiteService.getTestSuiteCount();
      this.testSuiteCount.subscribe(res => this.testSuiteCountPieChart = res);
    }, 20000);
    this.clearIds.push(clearId);
  }

  ngAfterViewInit(): void {

  }

}
