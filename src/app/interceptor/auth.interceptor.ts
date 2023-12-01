import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public jwtHelper: JwtHelperService, public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Kiểm tra URL yêu cầu có phải là URL login không
    if (request.url !== (environment.apiUrl + '/auth/login')) {
      // Lấy token từ localStorage
      const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
      if (!this.jwtHelper.isTokenExpired(accessToken)) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        // Người dùng chưa đăng nhập, chuyển hướng đến trang login
        this.router.navigate(['/login']);
      }
    }

    // Tiếp tục xử lý yêu cầu
    return next.handle(request);
  }
}
