import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private httpClient: HttpClient) {
  }

  createDriver(driver: any, userId: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/driver/user/${userId}`, driver).pipe(map(res => res));
  }

  updateDriver(driver: any, id: string, userId: string) {
    return this.httpClient.put<any>(`${environment.apiUrl}/tanistan/driver/${id}/user/${userId}`, driver).pipe(map(res => res));
  }

  findById(id: string, userId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/driver/${id}`).pipe(map(res => res));
  }

  findAll(userId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/driver/user/${userId}/all`).pipe(map(res => res));
  }
}
