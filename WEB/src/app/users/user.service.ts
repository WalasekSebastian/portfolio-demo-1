import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../app-var';
import { HttpClient } from '@angular/common/http';
import { LoginConf } from './login-conf';

@Injectable()
export class UserService {

  private API_URL = GlobalVariable.API_URL;

  constructor(private http: HttpClient) {}

   login(name: string, password: string): Observable<LoginConf> {
     const url = `${this.API_URL}login`;
     return this.http.post<LoginConf>(url, {name: name, password: password});
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
  }

}
