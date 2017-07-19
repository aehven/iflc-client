import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { DataService } from '../data.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../app.component.css', './user.css']
})
export class UserListComponent implements OnInit {
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public collectionSize = 1;
  public page = 1;
  public pageSize = 15;

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public location: Location,
    public router: Router) {}

  ngOnInit() {
    this.getIndex();

    this.searchControl.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        console.log(this.search);
        this.search = newValue;
        this.page = 1;
        this.getIndex();
    });

    localStorage.setItem('location', this.location.path());
  }

  public pageChanged(event) {
    this.getIndex();
  }

  public getIndex() {
    this.dataService.index("user", {per_page: this.pageSize, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.users;
      this.collectionSize = json.count
    });
  }
}
