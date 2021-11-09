import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../app-var';
import { Observable } from 'rxjs/Observable';
import { DateFromTo } from './models/date-from-to';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HistoryDateFromToService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getHistory(dateFrom: Date, dateTo: Date): Observable<DateFromTo[]> {
    return this.http.get<DateFromTo[]>(this.apiUrl + 'kloda/historydates' + `/${dateFrom}/${dateTo}`, {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }
}
