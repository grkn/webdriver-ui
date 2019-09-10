import {Component, OnInit} from '@angular/core';
import {TestCaseService} from '../services/test-case.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-runned-test-suites',
  templateUrl: './run-test-suites.component.html',
  styleUrls: ['./run-test-suites.component.scss']
})
export class RunTestSuitesComponent implements OnInit {

  savedEvent: any;
  totalRecords: number;
  results: any[];

  constructor(private manipulateService: TestCaseService) {
  }

  ngOnInit() {
  }

  existsFail(steps: any[]) {
    for (const step of steps) {
      if (step.status !== 0) {
        return true;
      }
    }
    return false;
  }

  loadResultLazy($event: any) {
    this.savedEvent = $event;
    this.manipulateService.getRunningInstancesUnderProject($event.first / $event.rows, $event.rows).subscribe(res => {
      this.totalRecords = res.totalElements;
      this.results = res.content;
    });
  }
}
