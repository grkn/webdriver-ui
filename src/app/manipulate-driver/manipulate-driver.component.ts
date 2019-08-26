import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRoute, ActivatedRouteSnapshot, Route} from '@angular/router';
import {TestModel} from '../models/test-model';
import {ElementAction} from '../models/element-action';

@Component({
  selector: 'app-manipulate-driver',
  templateUrl: './manipulate-driver.component.html',
  styleUrls: ['./manipulate-driver.component.scss']
})
export class ManipulateDriverComponent implements OnInit, OnDestroy {
  testCommands: ElementAction[] = [];
  selectionValue: string;
  selectionType: string;
  sessionId: string;
  displayedColumns: string[] = ['id', 'name', 'createdDate', 'actions'];
  testDataSource = new MatTableDataSource<TestModel>([]);
  createTestPage: boolean = false;
  selectedTestCaseId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  testCaseName: string;


  constructor(private manipulateservice: ManipulateServiceService,
              private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.testDataSource.paginator = this.paginator;
    this.route.data.subscribe(item => {
      this.testDataSource = new MatTableDataSource(item.testCaseResolver.content);
    });
  }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    this.testDataSource.filter = filterValue.trim().toLowerCase();
  }

  addElementAction() {
    this.testCommands.push({
      position: this.testCommands.length,
      selectionType: this.selectionType,
      selectionValue: this.selectionValue,
      selectedElementId: '',
      message: '',
      result: null,
      type: '',
      navigateUrl: ''
    });
  }

  ngOnDestroy(): void {
    this.manipulateservice.killSession(this.sessionId).subscribe();
  }

  removeRow(element) {
    const index = this.testCommands.indexOf(element)
    this.testCommands.splice(index, 1);
  }

  async runTest() {
    this.sessionId = (await this.manipulateservice.getSession()).sessionId;
    for (let i = 0; i < this.testCommands.length; i++) {
      const command: any = this.testCommands[i];
      command.selectedElementId = (await
        this.manipulateservice.findElementBy(command.selectionType, command.selectionValue, this.sessionId)).value.ELEMENT;

      if (command.type === 'click') {
        command.result = (await this.manipulateservice.clickElement(this.sessionId, command.selectedElementId));

      } else if (command.type === 'sendKey') {
        command.result = (await this.manipulateservice.sendKeysElement(this.sessionId, command.selectedElementId, command.message));

      } else if (command.type === 'goToUrl') {
        command.result = (await this.manipulateservice.navigateToUrl(command.navigateUrl, this.sessionId));
      }

      if (command.result.status !== 0) {
        return;
      }

    }
  }

  saveTest() {
    this.manipulateservice.saveTest(this.authenticationService.currentUserValue.id,
      this.testCommands, this.testCaseName, this.selectedTestCaseId)
      .subscribe(res => {
        if (res) {
          this.manipulateservice.findAllTest(this.authenticationService.currentUserValue.id, 0, 1000).subscribe(testModalPageable => {
            this.testDataSource = new MatTableDataSource(testModalPageable.content);
            this.createTestPage = false;
          });
        }
      });
  }

  openCreateTestPage() {
    this.createTestPage = true;
  }

  openEditTestPage(element: TestModel) {
    this.createTestPage = true;
    this.testCommands = element.testCommands;
    this.testCaseName = element.name;
    this.selectedTestCaseId = element.id;
  }

  openListPage() {
    this.createTestPage = false;
  }
}


