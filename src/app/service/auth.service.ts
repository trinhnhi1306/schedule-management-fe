import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  constructor() {}

  login(loginData: any): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/login', loginData).pipe();
  }

  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(
      JSON.parse(localStorage.getItem('token')).accessToken
    );
  }
}
