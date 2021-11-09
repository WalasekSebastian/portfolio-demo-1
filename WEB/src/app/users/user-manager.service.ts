import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../app-var';
import { Observable } from 'rxjs/Observable';
import { User } from '../main-view/models/user';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserManagerService {

  private apiUrl = GlobalVariable.API_URL;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'user/all', {headers: this.jwt()});
  }

  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'user/id/' + id, {headers: this.jwt()});
  }

  postEditUser(id: number, name: String, password: String, imie: String, nazwisko: String, isAdmin: String, active: String) {
    return this.http.post(this.apiUrl + 'user/update/' + id, {
      name: name, password: password, imie: imie, nazwisko: nazwisko, isAdmin: isAdmin, active: active}, {headers: this.jwt()});
  }

  postAddUser(name: String, password: String, imie: String, nazwisko: String, isAdmin: number, active: number) {
    return this.http.post(this.apiUrl + 'user/new', {
      name: name, password: password, imie: imie, nazwisko: nazwisko, isAdmin: isAdmin, active: active}, {headers: this.jwt()});
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + 'user/delete/' + id, {headers: this.jwt()});
  }

  private jwt() {
    // create authorization header with jwt token
    if (localStorage.getItem('token')) {
        return new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    }
  }

}
