import { Component, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

import { DataService } from '../data.service';
import { Note } from './note';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['../app.component.css']
})
export class NoteDetailComponent implements AfterViewInit {
  @Input() note: Note;

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

    var day = this.note.date.day;
    var monthIndex = this.note.date.month;
    var year = this.note.date.year;

    return monthNames[monthIndex-1] + " " + day + ", " + year;
  }

  dateChanged(): void {
    this.send();
  }

  send(): void {
    let s = document.getElementById("spinner_" + this.note.id);
    s.classList.remove("hidden");

    if(this.note.id) {
      this.dataService.update("note", this.note.id, this.note, {suppressNotification: true}).subscribe(
        res =>      {
          s.classList.add("hidden");
        }
      );
    }
    else {
      if(this.note.text){
        this.dataService.create("note", this.note, {suppressNotification: true}).subscribe(
          res =>      {
            s.classList.add("hidden");
            this.note.id = res.json().id;
          }
        );
      }
    }
  }
}
