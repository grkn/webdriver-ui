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
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testsuite/project/${projectId}/root`)
      .pipe(map(item => {
        return item;
      }));
  }

  addTestCaseTotestSuite(suiteId: string, testId: Array<string>) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testsuite/project/${projectId}/${suiteId}/addtest`, testId)
      .pipe(map(item => {
        return item;
      }));
  }

  createTestSuite(parentId: any, name: string) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testsuite/project/${projectId}`, {
      parentId,
      name,
      testCase: []
    }).pipe(map(item => {
      return item;
    }));
  }

  findTestBySuiteIdAndUserId(userId: string, suiteId: string) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testsuite/project/${projectId}/${suiteId}/testcases/user/${userId}`)
      .pipe(map(item => {
        return item;
      }));
  }

  removeTestCaseFromTestSuite(suiteId: string, testId: string) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/testsuite/project/${projectId}/${suiteId}/testcase/${testId}`)
      .pipe(map(item => {
        return item;
      }));
  }

  runTests(id: any, driverId: any) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.patch<any>(
      `${environment.apiUrl}/tanistan/testsuite/project/${projectId}/suite/${id}/testcase/run/driver/${driverId}`,
      {}).pipe(map(item => {
      return item;
    }));
  }

  getTestSuiteCount() {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/dashboard/project/${projectId}/testsuitecount`)
      .pipe(map(item => {
        return item;
      }));
  }

  findAllTestSuites(page: any, size: any) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/result/project/${projectId}/suites?page=${page}&size=${size}`)
      .pipe(map(item => {
        return item;
      }));
  }
}
