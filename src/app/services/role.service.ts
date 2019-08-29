import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  findAll(page: any, size: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/auhtorization/all?page=${page}&size=${size}`).pipe(map(res => res));
  }

  save(names: any) {
    const nameList = [];
    names.forEach(item => {
      nameList.push(item.name);
    });
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/auhtorization/`
      , {authorizations: nameList}).pipe(map(res => res));
  }

  delete(id: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/auhtorization/${id}`).pipe(map(res => res));
  }
}
