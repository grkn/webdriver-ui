import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestCaseService} from '../services/test-case.service';

@Component({
  selector: 'app-test-suit-run-history-detail',
  templateUrl: './test-suite-run-history-detail.component.html',
  styleUrls: ['./test-suite-run-history-detail.component.scss']
})
export class TestSuiteRunHistoryDetailComponent implements OnInit {

  reportDatasource: any[] = [];
  testSuiteName: string;
  stepsColumns: string[] = ['result', 'status', 'running', 'time'];

  constructor(private activatedRoute: ActivatedRoute, private testCase: TestCaseService) {
    this.activatedRoute.data.subscribe(data => {
      const testCaseReport = data.testSuiteRunHistoryDetailResolver;
      testCaseReport.forEach(runners => {
        this.testCase.getRunningInstances(runners.id, 0, 2000).subscribe(runningInstances => {
          const testRunnerReports = runningInstances.content;
          testRunnerReports.forEach(latestReport => {
            if (runners.runId === latestReport.testSuiteInstanceRunnerId) {
              latestReport.testCaseId = runners.id;
              latestReport.testCaseName = runners.name;
              this.testSuiteName = latestReport.testSuiteInstanceRunnerName;
              this.reportDatasource.push(latestReport);
            }
          });
        });
      });
    });
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
}

