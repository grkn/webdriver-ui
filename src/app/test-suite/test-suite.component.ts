import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestModel} from '../models/test-model';
import {TreeNode} from 'primeng/api';
import {TestSuiteService} from '../services/test-suite.service';
import {ToastrService} from 'ngx-toastr';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {AuthenticationService} from '../services/authenticate';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material';

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
  // Test Case DataTable for suite
  testCaseDataSource: TestModel[] = [];
  userName = this.authService.currentUserValue.accountName ?
    this.authService.currentUserValue.accountName : this.authService.currentUserValue.emailAddress;
  runInstances: Observable<any>;
  intervalObject = [];
  totalRecords = 0;
  selectedTestCaseId: string;
  runningInstances: any;
  savedEvent: any;
  stepDetailsDatasource: MatTableDataSource<any> = new MatTableDataSource([]);
  stepsColumns: string[] = ['result', 'status', 'running', 'time'];


  constructor(private route: ActivatedRoute, private testSuiteService: TestSuiteService,
              private toastr: ToastrService, private manipulateService: ManipulateServiceService,
              private authService: AuthenticationService) {
    this.route.data.subscribe(testCases => {
      this.source = testCases.testCaseResolver.content;
      const tree = testCases.testSuiteResolver;
      this.fillTreeNode(tree);
      this.treeNodes.push(tree);
    });

  }

  ngOnInit() {
  }

  private fillTreeNode(tree: any) {
    if (tree) {
      tree.data = {id: tree.id, name: tree.name, testCases: tree.testCases};
      tree.expandable = false;
      if (tree.children) {
        tree.children.forEach(treeChild => {
          this.fillTreeNode(treeChild);
        });
      }
    }
  }

  private findNode(root: any, parentId: any) {
    if (root) {

      if (root.id === parentId) {
        this.foundNode = root;
      }

      if (root.children) {
        root.children.forEach(treeChild => {
          this.findNode(treeChild, parentId);
        });
      }
    }
  }

  selectedNode(rowNode) {
    this.selectedTestSuiteId = rowNode.node;
    this.selectedTestCaseId = undefined;
    this.manipulateService.findAllTest(this.authService.currentUserValue.id, 0, 2000).subscribe(source => {

      this.testSuiteService.findTestBySuiteIdAndUserId(this.authService.currentUserValue.id, this.selectedTestSuiteId.id)
        .subscribe(res => {
          if (res && res.length > 0) {

            res.forEach(t => {
              source.content.splice(this.source.indexOf(t), 1);
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
          this.selectedTestSuiteId.data.testCases = res.testCases;
          this.testCaseDataSource = res.testCases;
        });
    } else {
      this.toastr.info('Please select test suite');
    }
  }

  addTestSuite(suite: any) {
    this.testSuiteService.createTestSuite(this.selectedTestSuiteId.data.id, this.newTestSuiteName).subscribe(res => {
      this.findNode(suite.value[0], this.selectedTestSuiteId.data.id);
      if (this.foundNode.children) {
        this.fillTreeNode(res)
        this.foundNode.children.push(res);
      } else {
        this.foundNode.children = [];
        this.fillTreeNode(res)
        this.foundNode.children.push(res);
      }
    });
  }

  removeTestCaseToSuite(event) {
    if (event.items.length > 0 && this.selectedTestSuiteId) {
      const testCaseId = event.items[0].id;

      this.testSuiteService.removeTestCaseFromTestSuite(this.selectedTestSuiteId.id, testCaseId).subscribe(value => {
        const testModelDeletion = this.selectedTestSuiteId.data.testCases.filter(item => item === testCaseId)
        const indexToDelete = this.selectedTestSuiteId.data.testCases.indexOf(testModelDeletion);
        this.selectedTestSuiteId.data.testCases.splice(indexToDelete, 1);

      });
    } else {
      this.toastr.info('Please select test suite');
    }
  }

  runTestSuite(rowNode) {
    this.selectedTestSuiteId = rowNode.node;

    this.testSuiteService.runTests(this.selectedTestSuiteId.id).subscribe(res => {
    });
  }

  visibilityOfTestCase(rowNode) {
    if (this.visibilityOfTestCaseList) {
      this.visibilityOfTestCaseList = false;
    } else {
      this.selectedTestSuiteId = rowNode.node;
      this.visibilityOfTestCaseList = true;
    }
  }

  showRunningTests(testCaseId: string) {
    this.selectedTestCaseId = testCaseId;
    this.loadRunningInstanceLazy(this.savedEvent);
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
      this.manipulateService.getRunningInstances(this.selectedTestCaseId, event.first, (event.first + event.rows)).subscribe(res => {
        this.totalRecords = res.totalElements;
        this.runningInstances = res.content;
        this.stepDetailsDatasource = new MatTableDataSource(res.content.steps);
      });
    }
  }

  ngOnDestroy(): void {
    this.clearAll();
  }
}
