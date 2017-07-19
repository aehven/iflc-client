import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { Activity } from './activity';
import { ActivityDetailComponent } from './activity-detail.component';
import { DataService } from '../data.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['../app.component.css']
})
export class ActivityListComponent implements OnInit {
  public data;
  public search: string;
  public collectionSize = 1;
  public page = 1;
  public pageSize = 5;
  public accountId = null;

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['account_id'];
      this.getIndex();
    });
    localStorage.setItem('location', this.location.path());
  }

  public pageChanged(event) {
    this.getIndex();
  }

  public getIndex() {
    this.dataService.index("activity", {account_id: this.accountId, per_page: this.pageSize, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.activities;
      this.collectionSize = json.count
    });
  }
}
