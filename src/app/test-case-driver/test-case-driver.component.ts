import {Component, OnInit, ViewChild} from '@angular/core';
import {TestCaseService} from '../services/test-case.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRoute, Router} from '@angular/router';
import {TestModel} from '../models/test-model';
import {ElementAction} from '../models/element-action';
import {DriverService} from '../services/driver.service';

@Component({
  selector: 'app-manipulate-driver',
  templateUrl: './test-case-driver.component.html',
  styleUrls: ['./test-case-driver.component.scss']
})
export class TestCaseDriverComponent implements OnInit {
  testCommands: ElementAction[] = [];
  selectionValue: string;
  selectionType: string;
  sessionId: string;
  displayedColumns: string[] = ['id', 'name', 'createdDate', 'actions'];
  testDataSource = new MatTableDataSource<TestModel>([]);
  createTestPage: boolean = false;
  selectedTestCaseId: string;
  result: ElementAction;
  driverList: any = [];
  driver: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  testCaseName: string;


  constructor(private manipulateservice: TestCaseService, private router: Router, private driverSerive: DriverService,
              private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.testDataSource.paginator = this.paginator;
    this.route.data.subscribe(item => {
      this.createTestPage = item.typeResolver === 'create' ? true : false;
      // this part is bad practice sorry if you have any question please ask me ? grkn
      if (this.createTestPage) {
        // create page
        this.openCreateTestPage();
        this.driverSerive.findAll(this.authenticationService.currentUserValue.id).subscribe(res => this.driverList = res);
      } else {
        if (!item.typeResolver) {
          // list page
          this.testDataSource = new MatTableDataSource(item.testCaseResolver.content);
        } else {
          // edit page
          this.manipulateservice.findTestById(item.typeResolver).subscribe(res => {
            this.driverSerive.findAll(this.authenticationService.currentUserValue.id).subscribe(driverList => this.driverList = driverList);
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

  removeRow(element) {
    this.testCommands = this.testCommands.filter(el => el !== element);
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
      this.testCommands, this.testCaseName, this.selectedTestCaseId, this.driver)
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
    this.driver = undefined;
    return true;
  }

  openEditTestPage(element: TestModel) {
    this.createTestPage = true;
    this.testCommands = element.testCommands;
    this.testCaseName = element.name;
    this.selectedTestCaseId = element.id;
    this.driver = element.driver;
  }

  toogleOverlay(event, overlay, command: ElementAction) {
    this.result = command;
    overlay.toggle(event);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1.address === o2.address && o1.port === o2.port;
  }
}


