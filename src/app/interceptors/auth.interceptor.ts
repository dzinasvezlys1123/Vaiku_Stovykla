import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, repeatWhen} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSevice:AuthService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authSevice.user!=null){
      let r=request.clone({
          params:request.params.append("auth",this.authSevice.user.idToken)
        }
      );
      return next.handle(r);
    }
    return next.handle(request);
  }
}
