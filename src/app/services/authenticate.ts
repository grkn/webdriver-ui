import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  private currentUser: Observable<User>;
  private projectsSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private projectsValues: Observable<any>;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    this.currentUser = this.currentUserSubject.asObservable();
    this.projectsValues = this.projectsSubject.asObservable();
  }

  public get currentUserValue(): User {
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
      user.project = null;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.toastr.success('You have successfully logged in.');
      return user;
    }));
  }

  setProject(project: any) {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.projectsSubject.next(project);
  }

  public get projectValue(): User {
    return this.projectsSubject.value;
  }

  public get currentProject(): Observable<any> {
    return this.currentProject;
  }

  public get projects(): Observable<any> {
    return this.projectsValues;
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.projectsSubject.next(null);
    this.router.navigate(['login']);
  }
}
