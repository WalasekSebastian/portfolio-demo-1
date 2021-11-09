import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor(private user: UserService, private router: Router) {
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit() {
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/']);
  }

}
