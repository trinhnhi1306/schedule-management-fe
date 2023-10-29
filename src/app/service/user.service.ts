import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getPage(params: any): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl, { params: params }).pipe()
  }

  getAllTrainers(): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl + "/trainers").pipe()
  }

  deleteById(id: bigint|undefined): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + "/" + id).pipe()
  }

  update(user: User): Observable<any> {
    return this.httpClient.put<any>(apiUrl + "/" + user.id, user).pipe()
  }

  createNew(user: User): Observable<any> {
    return this.httpClient.post<any>(apiUrl, user).pipe()
  }

}
