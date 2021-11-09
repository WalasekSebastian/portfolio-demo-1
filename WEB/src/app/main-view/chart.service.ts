import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../app-var';
import { ChartData } from './models/chart-data';
import { Observable } from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getChartData(date: string): Observable<ChartData> {
    return this.http.get<ChartData>(this.apiUrl + 'kloda/chartdata' + `/${date}`, {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }
}
