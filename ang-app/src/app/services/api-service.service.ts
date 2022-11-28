import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }

  apiUrl = 'http://localhost:3000/task';

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}=${ids}`);
  }
  InsertData(data:any): Observable<any> {
    return this._http.post(`${this.apiUrl}`,data);
  }
  getSingleData(id:any): Observable<any>{
    let ids = id;
    return this._http.get(`${this.apiUrl}=${ids}`);
  }
  updateTask(data:any,id:any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.apiUrl}=${ids}`,data);
  }
}
