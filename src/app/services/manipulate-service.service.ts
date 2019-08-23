import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionIdResource} from '../models/session-id-resource';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {DefaultResource} from '../models/default-resource';

@Injectable({
  providedIn: 'root'
})
export class ManipulateServiceService {

  constructor(private httpClient: HttpClient) {
  }

  killSession(sessionId: string) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}`).pipe(map(item => item));
  }

  getSession() {
    return this.httpClient.post<SessionIdResource>(
      `${environment.apiUrl}/tanistan/driver/session`, {desiredCapabilities: {}}).pipe(map(item => item));
  }

  navigateToUrl(url: string, sessionId: string) {
    return this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/url`, {url}).pipe(map(item => item));
  }

  findElementBy(type: string, value: string, sessionId: string) {
    return this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element`, {using: type, value}).pipe(map(item => item));
  }

  sendKeysElement(sessionId: string, elementId: string, message: string) {
    return this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/value`,
      {value: [message]}).pipe(map(item => item));
  }

  clickElement(sessionId: string, elementId: string) {
    return this.httpClient.post<DefaultResource>(
      `${environment.apiUrl}/tanistan/driver/session/${sessionId}/element/${elementId}/click`,
      {}).pipe(map(item => item));
  }
}
