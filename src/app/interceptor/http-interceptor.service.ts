import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authenticate';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogin = request.url.indexOf('/login') !== -1;
    const contentType = isLogin ? ['application/x-www-form-urlencoded'] : ['application/json'];
    const accept = isLogin ? ['application/x-www-form-urlencoded'] : ['application/json'];
    const withCredentials = isLogin ? false : true;


    request = request.clone({
      setHeaders: {
        Authorization: isLogin || !this.authenticationService.currentUserValue ?
          '' : 'Bearer ' + this.authenticationService.currentUserValue.accessToken,
        'Content-Type': contentType,
        Accept: accept,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '* ',
        'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      },
      withCredentials
    });
    return next.handle(request);
  }
}
