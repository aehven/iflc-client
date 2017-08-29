import { environment } from '../../environments/environment';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../user/user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent  {
  complexForm : FormGroup;
  imagePath = "/assets/cheese.jpg";

  constructor(public tokenService: Angular2TokenService,
              fb: FormBuilder, public router: Router,
              public dataService: DataService) {
    this.complexForm = fb.group({
      'email' : environment.demoUser || localStorage.getItem('email'),
      'password': environment.demoPassword || localStorage.getItem('pwd')
    })
  }

  submitForm(value: any): void {
    localStorage.setItem('email', value.email);
    localStorage.setItem('pwd', value.password);

    this.tokenService.signIn({
        email:    value.email,
        password: value.password
    }).subscribe(
      res =>      {
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    );
  }
}
