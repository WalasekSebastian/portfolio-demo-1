import { GlobalVariable } from '../app-var';
import { UstawieniaBoksow } from './models/ustawienia-boksow';
import { Kloda } from './models/kloda';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SumBoxes } from './models/sum-boxes';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getLastFiveKloda(): Observable<Kloda[]> {
    return this.http.get<Kloda[]>(this.apiUrl + 'kloda/last5', {headers: this.jwt()});
  }

  getIloscMetrow(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'kloda/iloscmetrow', {headers: this.jwt()});
  }

  getLastUstawianiaBoskow(): Observable<UstawieniaBoksow[]> {
    return this.http.get<UstawieniaBoksow[]>(this.apiUrl + 'ustawieniaboksow/last', {headers: this.jwt()});
  }

  getSumBoxes(): Observable<SumBoxes> {
    return this.http.get<SumBoxes>(this.apiUrl + 'kloda/sumboxes', {headers: this.jwt()});
  }

  getSumScans(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'kloda/iloscklod', {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }
}
