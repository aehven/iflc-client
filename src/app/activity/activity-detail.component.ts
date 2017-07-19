import { Component, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

import { DataService } from '../data.service';
import { Activity } from './activity';

@Component({
  selector: 'activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['../app.component.css']
})
export class ActivityDetailComponent implements AfterViewInit {
  @Input() activity: Activity;

  public textControl = new FormControl();

  constructor(public dataService: DataService) {
  }

  ngAfterViewInit() {
    this.textControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => {
        this.send();
    });
  }

  formatDate(): string {
    // thanks to http://stackoverflow.com/a/3552493/5874744
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = this.activity.date.day;
    var monthIndex = this.activity.date.month;
    var year = this.activity.date.year;

    return monthNames[monthIndex-1] + " " + day + ", " + year;
  }

  dateChanged(): void {
    this.send();
  }

  send(): void {
    let s = document.getElementById("spinner_" + this.activity.id);
    s.classList.remove("hidden");

    if(this.activity.id) {
      this.dataService.update("activity", this.activity.id, this.activity, {suppressNotification: true}).subscribe(
        res =>      {
          s.classList.add("hidden");
        }
      );
    }
    else {
      if(this.activity.text){
        this.dataService.create("activity", this.activity, {suppressNotification: true}).subscribe(
          res =>      {
            s.classList.add("hidden");
            this.activity.id = res.json().id;
          }
        );
      }
    }
  }
}
