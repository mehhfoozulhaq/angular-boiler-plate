import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  formIsSubmitted: boolean = false;
  apiError = null;

  constructor(private _fb: FormBuilder, private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {
    this.userLoginForm = this.createLoginForm();
  }

  btnSubmitHandler() {
    this.formIsSubmitted = true;

    if (this.userLoginForm.invalid) {
      return;
    }

    const data = {
      email: this.gfc.email.value,
      password: this.gfc.password.value
    };

    this.authService.login(data).subscribe(r => {
      
      if (r.status) {
        this.userLoginForm.reset();
        this.formIsSubmitted = false;
        localStorage.setItem('isLoggedIn', 'Yes');
        localStorage.setItem('access_token', r.token);
        this.router.navigateByUrl('/films');
      }
      else {
        localStorage.removeItem('access_token');
        this.apiError = r.msg;
      }
    }, (apiError: HttpErrorResponse) => {
      this.apiError = apiError.error.message;
    });

  }

  createLoginForm() {
    return this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  get gfc() { return this.userLoginForm.controls };

}
