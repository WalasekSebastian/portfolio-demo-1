import { UstawieniaBoksow } from '../models/ustawienia-boksow';
import { Component, OnInit } from '@angular/core';
import { Kloda } from '../models/kloda';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  autoRefresh = false;
  userName: string;
  date;

  constructor(private user: UserService, private router: Router) {
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit() {
    this.getTodays();
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/']);
  }

  change() {
    this.autoRefresh = !this.autoRefresh;
  }

  getTodays() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.date = `${year}-${month}-${day}`;
  }

}
