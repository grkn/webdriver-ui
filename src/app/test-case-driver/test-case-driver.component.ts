import {Component, OnInit, ViewChild} from '@angular/core';
import {TestCaseService} from '../services/test-case.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../services/authenticate';
import {ActivatedRoute, Router} from '@angular/router';
import {TestModel} from '../models/test-model';
import {ElementAction} from '../models/element-action';
import {DriverService} from '../services/driver.service';
import {SelectItem} from 'primeng/api';

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
  testDataSource = [];
  createTestPage: boolean = false;
  selectedTestCaseId: string;
  result: ElementAction;
  driverList: SelectItem[] = [];
  driver: any;
  testCaseName: string;
  commandTypes: SelectItem[] = [{label: 'Navigate', value: 'goToUrl'}, {label: 'Maximize', value: 'maximize'},
    {label: 'Send Keys', value: 'sendKey'}, {label: 'Click Element', value: 'click'}];
  commandSelectionType: SelectItem[] = [{label: 'id', value: 'id'},
    {label: 'xpath', value: 'xpath'},
    {label: 'css selector', value: 'css selector'},
    {label: 'className', value: 'className'},
    {label: 'name', value: 'name'},
    {label: 'link text', value: 'link text'},
    {label: 'partial link text', value: 'partial link text'},
    {label: 'tag name', value: 'tag name'}];

  constructor(private manipulateservice: TestCaseService, private router: Router, private driverSerive: DriverService,
              private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.route.data.subscribe(item => {
      this.createTestPage = item.typeResolver === 'create' ? true : false;
      // this part is bad practice sorry if you have any question please ask me ? grkn
      if (this.createTestPage) {
        // create page
        this.openCreateTestPage();
        this.driverSerive.findAll(this.authenticationService.currentUserValue.id).subscribe(res => {
          res.forEach(driver => {
            this.driverList.push({label: driver.name + '(' + driver.address + ')', value: driver});
          });
        });
      } else {
        if (!item.typeResolver) {
          // list page
          this.testDataSource = item.testCaseResolver.content;
        } else {
          // edit page
          this.manipulateservice.findTestById(item.typeResolver).subscribe(res => {
            this.driverSerive.findAll(this.authenticationService.currentUserValue.id).subscribe(driverList => {
              driverList.forEach(driver => {
                this.driverList.push({label: driver.name + '(' + driver.address + ')', value: driver});
              });
            });
            this.openEditTestPage(res);
          });
        }
      }
    });
  }

  ngOnInit(): void {
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
          this.manipulateservice.findAllTest(0, 2000).subscribe(testModalPageable => {
            this.testDataSource = testModalPageable.content;
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

}


