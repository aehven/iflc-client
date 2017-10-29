import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { Angular2TokenService } from 'angular2-token';

import { Cee } from './cee';
import { DataService } from '../data.service';

import * as FileSaver from 'file-saver'; //http://stackoverflow.com/a/41846201

@Component({
  selector: 'cee-list',
  templateUrl: './cee-list.component.html',
  styleUrls: ['../app.component.css', './cee.css']
})
export class CeeListComponent implements OnInit {
  public data;
  public sortBy = "name";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public collectionSize = 1;
  public page = 1;
  public pageSize = 5;
  public exportExcel = false;
  public favoritesOnly = false;

  public imagePath: string = "/assets/coffeebeans.jpg";

  constructor(public tokenService: Angular2TokenService,
    public dataService: DataService,
    public location: Location,
    public router: Router) {}

  ngOnInit() {
    this.favoritesOnly = JSON.parse(localStorage.getItem("favoritesOnly"));

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

  saveDownload(res: Response) : void {
    var blob = new Blob([res.text()], { type: 'application/xls' });

    FileSaver.saveAs(blob, "report.xls");
  }

  public exportClick(event) {
    this.exportExcel = true;
    (<HTMLInputElement> document.getElementById("exportButton")).disabled = true;
    this.getIndex().subscribe(
      data => {
        (<HTMLInputElement> document.getElementById("exportButton")).disabled = false;
        this.saveDownload(data);
        document.getElementById("exportButton").classList.add("accomplished");
        setTimeout(function() {
          document.getElementById("exportButton").classList.remove("accomplished");
        }, 2000);
      },
      error => {
        (<HTMLInputElement> document.getElementById("exportButton")).disabled = false;
        document.getElementById("exportButton").classList.add("failed");
        setTimeout(function() {
          document.getElementById("exportButton").classList.remove("failed");
        }, 2000);
      }
    )
    return false;
  }

  public getIndex(): Observable<Response> {
    let res = this.dataService.index("cee", {favorites_only: this.favoritesOnly, export: this.exportExcel, per_page: this.pageSize, page: this.page, search: this.search})
    res.subscribe(
      data => {
        if(this.exportExcel) {
          this.exportExcel = false;
        }
        else {
          let json = data.json();
          this.data = json.cees;
          this.collectionSize = json.count;
          localStorage.setItem('ceeStates', json.states);
        }
      },
      error => {
        this.exportExcel = false;
        console.error(JSON.stringify(error));
      });

    return res;
  }

  public favoritesOnlyChange(event): void {
    this.favoritesOnly = event.checked;
    localStorage.setItem("favoritesOnly", JSON.stringify(this.favoritesOnly));
    this.getIndex();
  }
}
