import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userregisterForm: FormGroup;
  formIsSubmitted: boolean = false;
  apiError = null;

  constructor(private _fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userregisterForm = this.createLoginForm();
  }

  btnSubmitHandler() {
    this.formIsSubmitted = true;

    if (this.userregisterForm.invalid) {
      return;
    }

    const data = {
      name: this.gfc.name.value,
      email: this.gfc.email.value,
      password: this.gfc.password.value,
      password_confirmation: this.gfc.password.value
    };

    this.authService.register(data).subscribe(r => {
      
      if (r.status) {
        this.userregisterForm.reset();
        this.formIsSubmitted = false;
        localStorage.setItem('access_token', r.token);
        return this.router.navigateByUrl('films');
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
      name: [null, Validators.required],
      password: [null, [Validators.required, Validators.min(6)]]
    })
  }

  get gfc() { return this.userregisterForm.controls };

}
