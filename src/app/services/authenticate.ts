import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  public get user(): Observable<User> {
    return this.currentUser;
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${environment.loginUrl}/login`, body.toString()).pipe(map(user => {
      user.accountPhrase = window.btoa(password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUserSubject.next(user);
      this.toastr.success('You have successfully logged in.');
      return user;
    }));
  }
}
