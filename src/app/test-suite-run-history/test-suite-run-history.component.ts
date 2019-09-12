import {Component, OnInit} from '@angular/core';
import {TestSuiteService} from '../services/test-suite.service';

@Component({
  selector: 'app-test-suite-run-history',
  templateUrl: './test-suite-run-history.component.html',
  styleUrls: ['./test-suite-run-history.component.scss']
})
export class TestSuiteRunHistoryComponent implements OnInit {

  savedEvent: any;
  results: any;
  private totalRecords: number;

  constructor(private testSuiteService: TestSuiteService) {
  }

  ngOnInit() {

  }


  loadSuiteLazy($event: any) {
    this.savedEvent = $event;
    this.testSuiteService.findAllTestSuites($event.first / $event.rows, $event.rows).subscribe(res => {
      this.results = res.content;
      this.totalRecords = res.totalElements;
    });
  }

}
