import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginConf } from '../login-conf';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isBad: boolean;
  isWorking: boolean;

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    this.isWorking = false;
    this.isBad = false;
    this.user.logout();
  }

  loginUser(e): void {
    this.isBad = false;
    this.isWorking = true;
    e.preventDefault();
    let userName: string = e.target.elements[0].value;
    let password: string = e.target.elements[1].value;

    this.user.login(userName, password).subscribe(
      (data: LoginConf) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('isAdmin', data.isAdmin);
        this.router.navigate(['/mv/dashboard']);
      },
    error => {
      this.isBad = true;
      this.isWorking = false;
    });
  }

}
