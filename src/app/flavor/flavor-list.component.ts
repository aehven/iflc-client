import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { Flavor } from './flavor';
import { DataService } from '../data.service';

@Component({
  selector: 'flavor-list',
  templateUrl: './flavor-list.component.html',
  styleUrls: ['../app.component.css', './flavor.css']
})
export class FlavorListComponent implements OnInit {
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public collectionSize = 1;
  public page = 1;
  public pageSize = 15;
  public ceeId = null;

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public location: Location,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ceeId = params['cee_id'];
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
    this.dataService.index("flavor", {cee_id: this.ceeId, per_page: this.pageSize, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.flavors;
      this.collectionSize = json.count
    });
  }
}
