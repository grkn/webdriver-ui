import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ManipulateServiceService} from '../services/manipulate-service.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: ManipulateServiceService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogin = request.url.indexOf('/login') !== -1;
    const contentType = isLogin ? ['application/x-www-form-urlencoded'] : ['application/json'];
    const accept = isLogin ? ['application/x-www-form-urlencoded'] : ['application/json'];
    request = request.clone({
      setHeaders: {
        'Content-Type': contentType,
        Accept: accept,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '* ',
        'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      }
    });
    return next.handle(request).pipe();
  }
}
