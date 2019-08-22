import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionIdResource} from '../models/session-id-resource';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManipulateServiceService {

  constructor(private httpClient: HttpClient) {
  }

  getSession() {
    return this.httpClient.post<SessionIdResource>(`${environment.apiUrl}/tanistan/driver/session`, {desiredCapabilities: {}}).pipe(map(item => item));
  }
}
