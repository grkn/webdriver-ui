import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestProjectService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  create(project: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testproject`, project).pipe(map(value => {
      this.toastr.success('Project created successfully');
      return value;
    }));
  }

  findAll(userId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testproject/user/${userId}/all`).pipe(map(value => value));
  }

  deleteById(id: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/tanistan/testproject/${id}`).pipe(map(res => res));
  }

  findById(id: string | null, userId: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/tanistan/testproject/${id}/user/${userId}`).pipe(map(res => res));
  }

  addAndRemove(project: any, userId: any, add: any, remove: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tanistan/testproject/${project.id}/user/${userId}/addandremove`, {
      add,
      remove
    }).pipe(map(value => {
      this.toastr.success('User operations are successfully');
      return value;
    }));
  }
}
