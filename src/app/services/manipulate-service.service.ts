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
export class ManipulateServiceService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  killSession(sessionId: string) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}`).pipe(map(item => item));
  }

  async getSession() {
    return await this.httpClient.post<SessionIdResource>(
      `${environment.apiUrl}/tanistan/driver/session`, {desiredCapabilities: {}}).toPromise().then(item => item);
  }

  async navigateToUrl(url: string, sessionId: string) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/url`, {url}).toPromise().then(item => item);
  }

  async findElementBy(type: string, value: string, sessionId: string) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element`, {using: type, value}).toPromise().then(item => item);
  }

  async sendKeysElement(sessionId: string, elementId: string, message: string) {
    return await this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/value`,
      {value: [message]}).toPromise().then(item => item);
  }

  async clickElement(sessionId: string, elementId: string) {
    return await  this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/click`,
      {}).toPromise().then(item => item);
  }

  saveTest(userId: string, testCommands: ElementAction[], name: string, id: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/test/user/${userId}`, {testCommands, name, id})
      .pipe(map(item => {
        if (id) {
          this.toastr.success('You have successfully edited test case.');
        } else {
          this.toastr.success('You have successfully saved test case.');
        }
        return item;
      }));
  }

  findAllTest(userId: string, page: number, size: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/test/user/${userId}/all?page=${page}&size=${size}`)
      .pipe(map(item => {
        return item;
      }));
  }

  getRunningInstances(testCaseId: string, page: number, size: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/test/${testCaseId}/instancerunner/all?page=${page}&size=${size}`)
      .pipe(map(item => {
        return item;
      }));
  }

  findTestById(testId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/test/${testId}`)
      .pipe(map(item => {
        return item;
      }));
  }

}
