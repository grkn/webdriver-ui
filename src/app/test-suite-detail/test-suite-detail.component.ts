import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Route, Router} from '@angular/router';
import {TestSuiteService} from '../services/test-suite.service';
import {ToastrService} from 'ngx-toastr';
import {DriverService} from '../services/driver.service';
import {AuthenticationService} from '../services/authenticate';
import {TestCaseService} from '../services/test-case.service';
import {SelectItem} from 'primeng/api';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-test-suite-detail',
  templateUrl: './test-suite-detail.component.html',
  styleUrls: ['./test-suite-detail.component.scss']
})
export class TestSuiteDetailComponent implements OnInit {

  totalRecords: number;
  testCases: any;
  suiteId: string;
  driverList: SelectItem[] = [];
  driver: SelectItem = {label: '', value: ''};

  testCaseLazyResult: any[];
  testCaseTotalRecords: number;
  selectedTestCases: any[];
  selectedTestCaseId: string;
  savedEvent: any;
  intervalObject: any[];
  runningInstances: any[];

  constructor(private activeRouter: ActivatedRoute, private testSuiteService: TestSuiteService, private toastr: ToastrService,
              private driverService: DriverService, private authService: AuthenticationService,
              private testCaseService: TestCaseService) {
    this.activeRouter.data.subscribe(res => {
      this.testCases = res.testSuiteDetailResolver;
    });

    this.activeRouter.paramMap.subscribe(params => {
      this.suiteId = params.get('id');
    });
    this.testCaseService.findAllTest(0, 2000).subscribe(source => {
      if (source) {
        this.testCaseLazyResult = source.content;
        this.testCaseTotalRecords = source.totalElements;
      }
    });
  }

  ngOnInit() {
    this.driverService.findAll(this.authService.currentUserValue.id).subscribe(res => {
      res.forEach(driver => {
        this.driverList.push({label: driver.name + '(' + driver.address + ')', value: driver});
      });
    });
  }

  runTestSuite() {
    if (!this.driver.value) {
      this.toastr.error('Please Select A Driver');
      return;
    }
    this.testSuiteService.runTests(this.suiteId, this.driver.value.id).subscribe(res => {
    });
  }

  loadAllTestCasesLazy($event: any) {
    this.testCaseService.findAllTest($event.first / $event.rows, $event.rows).subscribe(res => {
      if (res) {
        this.testCaseLazyResult = res.content;
        this.testCaseTotalRecords = res.totalElements;
      }
    });
  }

  addSelectedTest() {
    if (this.selectedTestCases) {
      const idList = [];
      this.selectedTestCases.forEach(item => {
        idList.push(item.id);
      });
      this.testSuiteService.addTestCaseTotestSuite(this.suiteId, idList)
        .subscribe(res => {
          this.testCases = res.testCases;
          this.totalRecords = res.testCases.length;
        });
    }
  }

  showRunningTestsAuto(id: any) {
    this.selectedTestCaseId = id;
    const intervalId = setInterval(() => {
      this.loadRunningInstanceLazy(this.savedEvent);
    }, 1000);
    this.intervalObject.push({id, intervalId});
  }

  clearAuto(id: any) {
    this.intervalObject.forEach(item => {
      if (item.id === id) {
        clearInterval(item.intervalId);
      }
    });
  }

  clearAll() {
    this.intervalObject.forEach(item => {
      clearInterval(item.intervalId);
    });
  }


  loadRunningInstanceLazy(event: any) {
    this.savedEvent = event;
    if (this.selectedTestCaseId) {
      this.testCaseService.getRunningInstances(this.selectedTestCaseId, event.first / event.rows, event.rows).subscribe(res => {
        this.totalRecords = res.totalElements;
        this.runningInstances = res.content;
      });
    }
  }
}
