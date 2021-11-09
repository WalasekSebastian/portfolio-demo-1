import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { UserManagerService } from '../../../users/user-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar, ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userDetailsForm: FormGroup;
  password_grup: FormGroup;

  isAdmin: boolean = false;
  active: boolean = true;

  validation_messages = {
    'repassword': [
      { type: 'required', message: 'Powtórzenie hasła jest wymagane' },
      { type: 'areEqual', message: 'Hasła do siebie nie pasują' }
    ]
};

parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(private userManager: UserManagerService, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
  }

  addUser(e): void {
    e.preventDefault();
    let login: string = e.target.elements[0].value;
    let imie: string = e.target.elements[1].value;
    let nazwisko: string = e.target.elements[2].value;
    let password: string = e.target.elements[3].value;

    this.userManager.postAddUser(login, password, imie, nazwisko, this.gvfbts(this.isAdmin), this.gvfbts(this.active)).subscribe(
      data => {
        this.router.navigate(['/mv/userManager']);
        this.openSnackBar();
      },
      err => {
        console.log('blad !!');
      });
  }

  gvfbts(value: boolean): number {
    if (value === true) {
      return 1;
    } else {
      return 0;
    }
  }

  isAdminF() {
    this.isAdmin = !this.isAdmin;
  }

  activeF() {
    this.active = !this.active;
  }

  openSnackBar() {
    this.snackBar.open('Dodano nowego użytkownika', 'OK', {
      duration: 3000,
    });
  }

  createForms(): void {
    this.password_grup = new FormGroup({
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.userDetailsForm = this.fb.group({
      login: new FormControl('', Validators.required),
      imie: new FormControl('', Validators.required),
      nazwisko: new FormControl('', Validators.required),
      password_group: this.password_grup
    });
  }

}

export class PasswordValidator {
  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static areEqual(formGroup: FormGroup) {
    let value;
    let valid = true;
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value;
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}

