import { UserService } from '../../users/user.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  userName: String;
  isAdmin: boolean;
  isMenuToogle: boolean;

  constructor(private user: UserService, private router: Router, private roter: ActivatedRoute) {
    this.userName = this.userNam(localStorage.getItem('userName'));
    this.isAdmin = this.userIsAdmin(localStorage.getItem('isAdmin'));
  }

  ngOnInit() {
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/']);
  }

  userNam(name: String) {
    return name.substr(1).slice(0, -1);
  }

  userIsAdmin(ad: String) {
    if (localStorage.getItem('isAdmin') === '1') {
      return true;
    } else {
      return false;
    }
  }

  btnToogle() {
    if (this.isMenuToogle === true) {
      this.isMenuToogle = false;
    }
    else {
      this.isMenuToogle = true;
    }
  }

  btn() {
    this.drawer.toggle();
  }
}
