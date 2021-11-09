import { Kloda } from './models/kloda';
import { HistoryPerDay } from './models/historyPerDay';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../app-var';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { KlodaApi } from './models/kloda-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HistoryService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getAllKlodas(page: number, pageSize: number): Observable<KlodaApi> {
    const url = `${this.apiUrl}kloda?&pageNumber=${page + 1}&pageSize=${pageSize}`;
    return this.http.get<KlodaApi>(url, {headers: this.jwt()
    });
  }

  getKlodasDates(dateFrom: Date, dateTo: Date): Observable<Kloda[]> {
    return this.http.get<Kloda[]>(this.apiUrl + 'kloda/getHistoryKlodDates' + `/${dateFrom}/${dateTo}`, {headers: this.jwt()});
  }

  getHistoryPerDay(dateFrom: Date, dateTo: Date): Observable<HistoryPerDay[]> {
    return this.http.get<HistoryPerDay[]>(this.apiUrl + 'kloda/historyperday' + `/${dateFrom}/${dateTo}`, {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }

}

