import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { Contact } from './contact';
import { DataService } from '../data.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../app.component.css', './contact.css']
})
export class ContactListComponent implements OnInit {
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public collectionSize = 1;
  public page = 1;
  public pageSize = 15;
  public accountId = null;

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public location: Location,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['account_id'];
      this.getIndex();
    });

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
    this.dataService.index("contact", {account_id: this.accountId, per_page: this.pageSize, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.contacts;
      this.collectionSize = json.count
    });
  }
}
