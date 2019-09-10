import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestCaseService} from '../services/test-case.service';

@Component({
  selector: 'app-run-test-detail',
  templateUrl: './run-test-detail.component.html',
  styleUrls: ['./run-test-detail.component.scss']
})
export class RunTestDetailComponent implements OnInit {

  testCommands: any[] = [];
  steps: any[] = [];
  sessionId: string;

  constructor(private activatedRoute: ActivatedRoute, private testCaseService: TestCaseService) {
    this.activatedRoute.data.subscribe(data => {
      if (data.runTestDetailResolver && data.runTestDetailResolver.testCaseResource) {
        this.testCommands = data.runTestDetailResolver.testCaseResource.testCommands;
        this.steps = data.runTestDetailResolver.steps;
      }
    });
  }

  ngOnInit() {

  }

  async runTest() {
    this.sessionId = (await this.testCaseService.getSession()).sessionId;
    this.steps = [];
    for (let i = 0; i < this.testCommands.length; i++) {
      const command: any = this.testCommands[i];

      if (command.type === 'click') {
        command.selectedElementId = (await
          this.testCaseService.findElementBy(command.selectionType, command.selectionValue, this.sessionId)).value.ELEMENT;
        command.result = (await this.testCaseService.clickElement(this.sessionId, command.selectedElementId));
        this.steps.push(command.result);

      } else if (command.type === 'sendKey') {
        command.selectedElementId = (await
          this.testCaseService.findElementBy(command.selectionType, command.selectionValue, this.sessionId)).value.ELEMENT;
        command.result = (await this.testCaseService.sendKeysElement(this.sessionId, command.selectedElementId, command.message));
        this.steps.push(command.result);

      } else if (command.type === 'goToUrl') {
        command.result = (await this.testCaseService.navigateToUrl(command.navigateUrl, this.sessionId));
        this.steps.push(command.result);
      }

      if (command.result.status !== 0) {
        return;
      }

    }
    this.testCaseService.killSession(this.sessionId).subscribe();
  }
}
