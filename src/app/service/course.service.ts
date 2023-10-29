import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../interface/course';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = environment.apiUrl + '/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl + '/all').pipe()
  }

  getPage(params: any): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl, { params: params }).pipe()
  }

  deleteById(id: bigint|undefined): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + "/" + id).pipe()
  }

  update(course: Course): Observable<any> {
    return this.httpClient.put<any>(apiUrl + "/" + course.id, course).pipe()
  }

  createNew(course: Course): Observable<any> {
    return this.httpClient.post<any>(apiUrl, course).pipe()
  }
  
}
