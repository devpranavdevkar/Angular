import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";

import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const token = this.authenticationService.getToken();
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (isLoggedIn ) {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
        }
        if (err.status === 403) {
          this.authenticationService.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(err.error);
      }));
    }else{
      return next.handle(request);
    }


  }
}
