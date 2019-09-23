import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestModel} from '../models/test-model';
import {SelectItem, TreeNode} from 'primeng/api';
import {TestSuiteService} from '../services/test-suite.service';
import {ToastrService} from 'ngx-toastr';
import {TestCaseService} from '../services/test-case.service';
import {AuthenticationService} from '../services/authenticate';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material';
import {DriverService} from '../services/driver.service';

@Component({
  selector: 'app-test-suite',
  templateUrl: './test-suite.component.html',
  styleUrls: ['./test-suite.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class TestSuiteComponent implements OnInit, OnDestroy {

  source: TestModel[];
  target: TestModel[] = [];
  treeNodes: TreeNode[] = [];
  selectedTestSuiteId: any;
  newTestSuiteName: string;
  foundNode: any;
  visibilityOfTestCaseList: boolean;
  testCaseDataSource: TestModel[] = [];
  userName = this.authService.currentUserValue.accountName ?
    this.authService.currentUserValue.accountName : this.authService.currentUserValue.emailAddress;
  intervalObject = [];
  totalRecords = 0;
  selectedTestCaseId: string;
  runningInstances: any;
  savedEvent: any;
  stepDetailsDatasource: MatTableDataSource<any> = new MatTableDataSource([]);
  driverList: SelectItem[] = [];
  driver: SelectItem = {label: '', value: ''};
  suites: any[];
  totalRecordsSuites: number;
  suiteEvent: any;
  selectedProject: any;

  constructor(private route: ActivatedRoute, private testSuiteService: TestSuiteService,
              private toastr: ToastrService, private manipulateService: TestCaseService,
              private authService: AuthenticationService, private driverSerive: DriverService) {
    this.selectedProject = JSON.parse(localStorage.getItem('selectedProject'));

    this.route.data.subscribe(testCases => {
      this.source = testCases.testCaseResolver.content;
      const data = testCases.testSuiteResolver;
      this.suites = data.content;
      this.totalRecordsSuites = data.totalElements;
    });
    this.driverSerive.findAll(this.authService.currentUserValue.id).subscribe(res => {
      res.forEach(driver => {
        this.driverList.push({label: driver.name + '(' + driver.address + ')', value: driver});
      });
    });
  }

  ngOnInit() {
  }

  selectedNode(event) {
    this.selectedTestSuiteId = event.data;
    this.selectedTestCaseId = undefined;
    this.source = [];
    this.target = [];
    this.manipulateService.findAllTest(0, 2000).subscribe(source => {

      this.testSuiteService.findTestBySuiteId(this.selectedTestSuiteId.id)
        .subscribe(res => {
          if (res && res.length > 0) {

            res.forEach(t => {
              if (source.content) {
                source.content = source.content.filter(item => item.id !== t.id);
              }
            });
            this.source = source.content;
            this.target = res;
            this.testCaseDataSource = res;
          } else {
            this.source = source.content;
            this.target = [];
            this.testCaseDataSource = [];
          }
        });
    });
  }

  addTestCaseToSuite(event) {
    if (event.items.length > 0 && this.selectedTestSuiteId) {
      const testCaseId = event.items[0].id;
      this.testSuiteService.addTestCaseTotestSuite(this.selectedTestSuiteId.id, [testCaseId])
        .subscribe(res => {
          this.selectedTestSuiteId.testCases = res.testCases;
          this.testCaseDataSource = res.testCases;
        });
    } else {
      this.toastr.info('Please select test suite');
    }
  }

  addTestSuite() {
    this.testSuiteService.createTestSuite(this.newTestSuiteName).subscribe(res => {
      if (res) {
        this.loadAllSuitesLazy(this.suiteEvent);
      }
    });
  }

  removeTestCaseToSuite(event) {
    if (event.items.length > 0 && this.selectedTestSuiteId) {
      const testCaseId = event.items[0].id;

      this.testSuiteService.removeTestCaseFromTestSuite(this.selectedTestSuiteId.id, testCaseId).subscribe(value => {
        this.selectedTestSuiteId.data.testCases = this.selectedTestSuiteId.data.testCases.filter(item => {
          return item.id !== testCaseId;
        });
        this.testCaseDataSource = this.selectedTestSuiteId.data.testCases;
      });
    } else {
      this.toastr.info('Please select test suite');
    }
  }


  visibilityOfTestCase(rowNode) {
    if (this.visibilityOfTestCaseList) {
      this.visibilityOfTestCaseList = false;
    } else {
      this.selectedTestSuiteId = rowNode;
      this.visibilityOfTestCaseList = true;
    }
  }

  showRunningTests(testCaseId: string) {
    this.selectedTestCaseId = testCaseId;
    if (this.savedEvent) {
      this.loadRunningInstanceLazy(this.savedEvent);
    }
  }

  showRunningTestsAuto(id: any) {
    const intervalId = setInterval(() => {
      this.showRunningTests(id);
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
      this.manipulateService.getRunningInstances(this.selectedTestCaseId, event.first / event.rows, event.rows).subscribe(res => {
        this.totalRecords = res.totalElements;
        this.runningInstances = res.content;
        this.stepDetailsDatasource = new MatTableDataSource(res.content.steps);
      });
    }
  }

  ngOnDestroy(): void {
    this.clearAll();
  }

  loadAllSuitesLazy($event: any) {
    this.testSuiteService.findAll($event.first / $event.rows, $event.rows).subscribe(res => {
      if (res) {
        this.totalRecordsSuites = res.totalElements;
        this.suites = res.content;
        this.suiteEvent = $event;
      }
    });
  }

  selectSuite($event: any) {

  }
}
