import { environment } from '../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user/user';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  apiPath = environment.apiPath;
  notificationOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: false,
    showProgressBar: false
  }

  constructor(public tokenService: Angular2TokenService,
    public router: Router,
    public location: Location,
    public dataService: DataService) {}

  ngOnInit(): void {
    this.tokenService.init({
        apiPath: this.apiPath
    });
  }

  public logOut() {
    this.tokenService.signOut().subscribe(
      res => {
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/login/']);
      }
    );

    return false;
  }

  public reload() {
    this.router.navigate(['/login/']);
    window.location.reload();

    return false;
  }

  public eventDestroyed(event) {
    // console.log("eventDestroyed: " + JSON.stringify(event));
  }
}
