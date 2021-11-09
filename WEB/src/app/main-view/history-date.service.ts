import { SumBoxes } from './models/sum-boxes';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../app-var';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HistoryDateService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getIloscMetrow(date: Date): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'kloda/imd' + `/${date}`, {headers: this.jwt()});
  }

  getIloscKlod(date: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'kloda/ikd' + `/${date}`, {headers: this.jwt()});
  }

  getSumMetryBoxes(date: string): Observable<SumBoxes> {
    return this.http.get<SumBoxes>(this.apiUrl + 'kloda/smbd' + `/${date}`, {headers: this.jwt()});
  }

  getSumIloscBoxes(date: string): Observable<SumBoxes> {
    return this.http.get<SumBoxes>(this.apiUrl + 'kloda/sibd' + `/${date}`, {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }

}
