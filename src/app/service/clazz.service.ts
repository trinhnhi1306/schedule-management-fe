import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clazz } from '../interface/clazz';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = environment.apiUrl + '/clazzes';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(private httpClient:HttpClient) { }

  getPage(params: any): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl, { params: params }).pipe()
  }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl + '/all').pipe()
  }

  deleteById(id: bigint|undefined): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + "/" + id).pipe()
  }

  update(clazz: Clazz): Observable<any> {
    return this.httpClient.put<any>(apiUrl + "/" + clazz.id, clazz).pipe()
  }

  createNew(clazz: Clazz): Observable<any> {
    return this.httpClient.post<any>(apiUrl, clazz).pipe()
  }

}
