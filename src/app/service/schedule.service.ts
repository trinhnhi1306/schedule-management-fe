import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../interface/schedule';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = environment.apiUrl + '/training-schedules';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient:HttpClient) { }

  getPage(params: any): Observable<any> {
    return this.httpClient.get<any>(apiUrl, { params: params }).pipe()
  }
  
  deleteById(id: bigint|undefined): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + "/" + id).pipe()
  }

  update(schedule: Schedule): Observable<any> {
    return this.httpClient.put<any>(apiUrl + "/" + schedule.id, schedule).pipe()
  }

  createNew(schedule: Schedule): Observable<any> {
    return this.httpClient.post<any>(apiUrl, schedule).pipe()
  }

}