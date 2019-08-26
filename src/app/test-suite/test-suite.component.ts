import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestModel} from '../models/test-model';
import {TreeNode} from 'primeng/api';
import {TestSuiteService} from '../services/test-suite.service';
import {ToastrService} from 'ngx-toastr';
import {findNode} from '@angular/compiler';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {AuthenticationService} from '../services/authenticate';

@Component({
  selector: 'app-test-suite',
  templateUrl: './test-suite.component.html',
  styleUrls: ['./test-suite.component.scss']
})
export class TestSuiteComponent implements OnInit {

  source: TestModel[];
  target: TestModel[] = [];
  treeNodes: TreeNode[] = [];
  selectedTestSuiteId: any;
  newTestSuiteName: string;
  foundNode: any;

  constructor(private route: ActivatedRoute, private testSuiteService: TestSuiteService,
              private toastr: ToastrService, private manipulateService: ManipulateServiceService, private authService: AuthenticationService) {
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
    this.manipulateService.findAllTest(this.authService.currentUserValue.id, 0, 2000).subscribe(source => {

      this.testSuiteService.findTestBySuiteId(this.selectedTestSuiteId.id).subscribe(res => {
        this.source = source.content;
        this.target = [];
        if (res && res.length > 0) {
          this.target = res;
          this.source = this.source.filter(testModel => {
            this.target.forEach(target => {
              if (target.id === testModel.id) {
                return false;
              }
            });
          });
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
        });
    } else {
      this.toastr.info('Please select test suite');
    }
  }

  addTestSuite(suite: any) {
    this.testSuiteService.createTestSuite(this.selectedTestSuiteId.data.id, this.newTestSuiteName, this.target).subscribe(res => {
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
        const indexToDelete = this.selectedTestSuiteId.data.testCases.indexOf(value.testCases);
        this.selectedTestSuiteId.data.testCases.splice(indexToDelete, 1);
      });
    } else {
      this.toastr.info('Please select test suite');
    }
  }
}
