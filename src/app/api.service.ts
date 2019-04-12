import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baserl = 'http://127.0.0.1:8000/';
    httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient) {}
    getData(modelo: string, url?: string): Observable<any> {
      if (url) {
          return this.http.get(this.baserl + modelo + url,
          {headers: this.httpHeaders});
      } else {
          return this.http.get(this.baserl + modelo,
          {headers: this.httpHeaders});
      }
    }
    getDataId(modelo: string, id?: string): Observable<any> {
      return this.http.get(this.baserl + modelo + id + '/',
      {headers: this.httpHeaders});
    }
    updateData(modelo: string, data: any): Observable<any> {
      return this.http.put(this.baserl + modelo + data.id + '/', data,
      {headers: this.httpHeaders});
    }
    deleteData(modelo: string, data: any): Observable<any> {
      return this.http.put(this.baserl + modelo + data.id + '/', data,
      {headers: this.httpHeaders});
    }
    addData(modelo: string, data: any): Observable<any> {
      return this.http.post(this.baserl + modelo , data,
      {headers: this.httpHeaders});
    }
    findData(modelo: string, params: string, term: string): Observable<any> {
      return this.http.get(this.baserl + modelo + params + term + '',
      {headers: this.httpHeaders});
    }
    findDataComplete(modelo: string, term: string): Observable<any> {
      return this.http.get(this.baserl + modelo + term + '',
      {headers: this.httpHeaders});
    }
  }
