import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionIdResource} from '../models/session-id-resource';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {DefaultResource} from '../models/default-resource';
import {ToastrService} from 'ngx-toastr';
import {ElementAction} from '../models/element-action';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  killSession(sessionId: string, driverUrl: any) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}?driverUrl=${driverUrl}`).pipe(map(item => item));
  }

  async getSession(driverUrl: any) {
    return await this.httpClient.post<SessionIdResource>(
      `${environment.apiUrl}/tanistan/driver/session?driverUrl=${driverUrl}`,
      {desiredCapabilities: {browserName: 'chrome'}}).toPromise().then(item => item);
  }

  async navigateToUrl(url: string, sessionId: string, driverUrl: any) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/url?driverUrl=${driverUrl}`, {url}).toPromise()
      .then(item => item);
  }

  async maximize(sessionId: string, driverUrl: any) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/window/current/maximize?driverUrl=${driverUrl}`, {}).toPromise()
      .then(item => item);
  }

  async findElementBy(type: string, value: string, sessionId: string, driverUrl: any) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element?driverUrl=${driverUrl}`, {
        using: type,
        value
      }).toPromise().then(item => item);
  }

  async sendKeysElement(sessionId: string, elementId: string, message: string, driverUrl: any) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/value?driverUrl=${driverUrl}`,
      {value: [message]}).toPromise().then(item => item);
  }

  async clickElement(sessionId: string, elementId: string, driverUrl: any) {
    return await  this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/click?driverUrl=${driverUrl}`,
      {}).toPromise().then(item => item);
  }

  async getElementText(sessionId: string, selectedElementId: string | string, address: any) {
    return await this.httpClient.get<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${selectedElementId}/text?driverUrl=${address}`
    ).toPromise().then(item => item);
  }

  saveTest(userId: string, testCommands: ElementAction[], name: string, id: string, driver: any) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/test/project/${projectId}/user/${userId}`,
      {testCommands, name, id, driver})
      .pipe(map(item => {
        if (id) {
          this.toastr.success('You have successfully edited test case.');
        } else {
          this.toastr.success('You have successfully saved test case.');
        }
        return item;
      }));
  }

  findAllTest(page: number, size: number) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/test/project/${projectId}/all?page=${page}&size=${size}`)
      .pipe(map(item => {
        return item;
      }));
  }

  getRunningInstances(testCaseId: string, page: number, size: number) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(
      `${environment.apiUrl}/tanistan/test/project/${projectId}/${testCaseId}/instancerunner/all?page=${page}&size=${size}`)
      .pipe(map(item => {
        return item;
      }));
  }

  findTestById(testId: string) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/test/project/${projectId}/${testId}`)
      .pipe(map(item => {
        return item;
      }));
  }

  getTestCaseCount() {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/dashboard/project/${projectId}/testcasecount`)
      .pipe(map(item => {
        return item;
      }));
  }

  getRunningInstancesUnderProject(page: number, size: any, suiteName: any) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    let url = `${environment.apiUrl}/tanistan/result/project/${projectId}/all?page=${page}&size=${size}`;
    if (suiteName) {
      url = `${environment.apiUrl}/tanistan/result/project/${projectId}/all?page=${page}&size=${size}&suiteName=${suiteName}`;
    }
    return this.httpClient.get<any>(url).pipe(map(item => {
      return item;
    }));
  }

  getRunningInstanceUnderProjectById(id: string) {
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const projectId = selectedProject ? selectedProject.id : null;
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/result/project/${projectId}/${id}`)
      .pipe(map(item => {
        return item;
      }));
  }



}
