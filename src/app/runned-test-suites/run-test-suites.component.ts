import {Component, OnInit} from '@angular/core';
import {TestCaseService} from '../services/test-case.service';

@Component({
  selector: 'app-runned-test-suites',
  templateUrl: './run-test-suites.component.html',
  styleUrls: ['./run-test-suites.component.scss']
})
export class RunTestSuitesComponent implements OnInit {

  savedEvent: any;
  totalRecords: number;
  results: any[];
  suiteName: string;
  delayId: any;

  constructor(private manipulateService: TestCaseService) {
  }

  ngOnInit() {
  }

  existsFail(steps: any[]) {
    if (steps) {
      for (const step of steps) {
        if (step.status !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  loadResultLazy($event: any) {
    this.manipulateService.getRunningInstancesUnderProject($event.first / $event.rows, $event.rows, $event.suiteFilter).subscribe(res => {
      this.totalRecords = res.totalElements;
      this.results = res.content;
      this.savedEvent = $event;
    });
  }


  setSuiteName($event) {
    this.suiteName = $event.target.value;
    this.savedEvent.suiteFilter = this.suiteName;
    clearTimeout(this.delayId);
    this.delayId = setTimeout(() => {
      this.loadResultLazy(this.savedEvent);
      clearTimeout(this.delayId);
    }, 700);
  }
}
