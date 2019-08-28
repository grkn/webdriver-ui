import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  findAllUsers(page: number, size: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/user/all?page=${page}&size=${size}`).pipe(map(res => res));
  }

  deleteById(id: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/user/${id}`).pipe(map(res => res));
  }

  save(user: User) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/user`, {
      name: user.name,
      lastName: user.lastName,
      middleName: user.middleName,
      accountName: user.accountName,
      accoutPhrase: user.accountPhrase,
      emailAddress: user.emailAddress,
      birthDay : user.birthDay
    }).pipe(map(res => res));
  }
}
