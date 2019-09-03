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

  deleteById(id: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/user/${id}`).pipe(map(res => res));
  }

  save(user: User, companyId: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/user/company/${companyId}`, {
      name: user.name,
      lastName: user.lastName,
      accountName: user.emailAddress,
      accountPhrase: user.accountPhrase,
      emailAddress: user.emailAddress
    }).pipe(map(res => res));
  }

  findById(id: string) {
    return this.httpClient.get<User>(`${environment.apiUrl}/tanistan/user/${id}`).pipe(map(res => res));
  }

  edit(user: User) {
    return this.httpClient.patch<User>(`${environment.apiUrl}/tanistan/user/${user.id}`, {
      name: user.name,
      lastName: user.lastName,
      accountName: user.emailAddress,
      accountPhrase: user.accountPhrase,
      emailAddress: user.emailAddress
    }).pipe(map(res => res));
  }

  addRoleToUser(id: any, role: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/user/${id}`,
      {authorizations: [role.authorization]}).pipe(map(res => res));
  }

  register(company: string, user: User) {
    delete user.accessToken;
    delete user.companyId;
    delete user.companyName;
    user.accountName = user.emailAddress;
    return this.httpClient.post<User>(`${environment.apiUrl}/register/userRegister`, {name: company, users: [user]})
      .pipe(map(res => res));
  }

  findAllUsersByCompany(company: string, page: number, size: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/user/company/${company}/all?page=${page}&size=${size}`)
      .pipe(map(res => res));
  }
}
