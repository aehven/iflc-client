import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { Note } from './note';
import { NoteDetailComponent } from './note-detail.component';
import { DataService } from '../data.service';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['../app.component.css']
})
export class NoteListComponent implements OnInit {
  public data;
  public search: string;
  public collectionSize = 1;
  public page = 1;
  public pageSize = 5;
  public ceeId = null;

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ceeId = params['cee_id'];
      this.getIndex();
    });
    localStorage.setItem('location', this.location.path());
  }

  public pageChanged(event) {
    this.getIndex();
  }

  public getIndex() {
    this.dataService.index("note", {cee_id: this.ceeId, per_page: this.pageSize, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.notes;
      this.collectionSize = json.count
    });
  }
}
