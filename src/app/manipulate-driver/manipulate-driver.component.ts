import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ManipulateServiceService} from '../services/manipulate-service.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRoute, Router} from '@angular/router';
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
  result: ElementAction;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  testCaseName: string;


  constructor(private manipulateservice: ManipulateServiceService,private router: Router,
              private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.testDataSource.paginator = this.paginator;
    this.route.data.subscribe(item => {
      this.createTestPage = item.typeResolver === 'create' ? true : false;
      if (this.createTestPage) {
        this.openCreateTestPage();
      } else {
        if (!item.typeResolver) {
          this.testDataSource = new MatTableDataSource(item.testCaseResolver.content);
        } else {
          this.manipulateservice.findTestById(item.typeResolver).subscribe(res => {
            this.openEditTestPage(res);
          });
        }
      }
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
    this.testCommands  = this.testCommands.filter(el => el !== element);
  }

  async runTest() {
    this.sessionId = (await this.manipulateservice.getSession()).sessionId;
    for (let i = 0; i < this.testCommands.length; i++) {
      const command: any = this.testCommands[i];


      if (command.type === 'click') {
        command.selectedElementId = (await
          this.manipulateservice.findElementBy(command.selectionType, command.selectionValue, this.sessionId)).value.ELEMENT;
        command.result = (await this.manipulateservice.clickElement(this.sessionId, command.selectedElementId));

      } else if (command.type === 'sendKey') {
        command.selectedElementId = (await
          this.manipulateservice.findElementBy(command.selectionType, command.selectionValue, this.sessionId)).value.ELEMENT;
        command.result = (await this.manipulateservice.sendKeysElement(this.sessionId, command.selectedElementId, command.message));

      } else if (command.type === 'goToUrl') {
        command.result = (await this.manipulateservice.navigateToUrl(command.navigateUrl, this.sessionId));
      }

      if (command.result.status !== 0) {
        return;
      }

    }
    this.manipulateservice.killSession(this.sessionId).subscribe();
  }

  saveTest() {
    this.manipulateservice.saveTest(this.authenticationService.currentUserValue.id,
      this.testCommands, this.testCaseName, this.selectedTestCaseId)
      .subscribe(res => {
        if (res) {
          this.manipulateservice.findAllTest(this.authenticationService.currentUserValue.id, 0, 1000).subscribe(testModalPageable => {
            this.testDataSource = new MatTableDataSource(testModalPageable.content);
            this.router.navigate(['testcases']);
          });
        }
      });
  }

  openCreateTestPage(): boolean {
    this.createTestPage = true;
    this.selectedTestCaseId = undefined;
    this.testCommands = [];
    this.testCaseName = undefined;
    return true;
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

  toogleOverlay(event, overlay, command: ElementAction) {
    this.result = command;
    overlay.toggle(event);
  }
}


