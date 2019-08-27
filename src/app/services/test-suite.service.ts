import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  findRoot() {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testsuite/root`)
      .pipe(map(item => {
        return item;
      }));
  }

  addTestCaseTotestSuite(suiteId: string, testId: Array<string>) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testsuite/${suiteId}/addtest`, testId)
      .pipe(map(item => {
        return item;
      }));
  }

  createTestSuite(parentId: any, name: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testsuite`, {
      parentId,
      name,
      testCase: []
    }).pipe(map(item => {
      return item;
    }));
  }

  findTestBySuiteIdAndUserId(userId: string, suiteId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testsuite/${suiteId}/testcases/user/${userId}`).pipe(map(item => {
      return item;
    }));
  }

  removeTestCaseFromTestSuite(suiteId: string, testId: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/testsuite/${suiteId}/testcase/${testId}`)
      .pipe(map(item => {
        return item;
      }));
  }

  runTests(id: any) {
    return this.httpClient.patch<any>(`${environment.apiUrl}/tanistan/testsuite/${id}/testcase/run`,
      {}).pipe(map(item => {
      return item;
    }));
  }
}
