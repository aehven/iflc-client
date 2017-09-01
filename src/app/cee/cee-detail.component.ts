import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs/Rx';

import {Angular2TokenService} from 'angular2-token';
import {NotificationsService} from 'angular2-notifications';

import { Cee } from './cee';
import { Favorite } from '../favorite/favorite'
import { FavoriteComponent } from '../favorite/favorite.component';
import {DataService} from '../data.service';

import {MyValidators} from '../shared/my-validators';

@Component({
  selector: 'cee-detail',
  templateUrl: './cee-detail.component.html',
  styleUrls: ['../app.component.css', './cee.css']
})
export class CeeDetailComponent implements OnInit {
  public component = this;
  public form : FormGroup;
  public isReadOnly:boolean=true;

  public title: string = 'Really delete this cee?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  public id;
  public timerSubscription;

  public ceeStates;

  public imagePath: string;

  constructor(public tokenService: Angular2TokenService,
              public dataService: DataService,
              public route: ActivatedRoute,
              public router: Router,
              public location: Location,
              public notificationsService: NotificationsService,
              fb: FormBuilder) {
                this.form = fb.group({
                  'name' : [null, Validators.required],
                  'state' : null,
                  'animal' : null,
                  'vegetable': null,
                  'mineral': null
                })
              }

  ngOnInit() {
    this.getCee();
    document.getElementById('top').scrollIntoView(true)
    localStorage.setItem('location', this.location.path());
    this.ceeStates = localStorage.getItem('ceeStates').split(',');
  }

  getCee():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id == "new") {
        this.enableForm();
      }
      else {
        this.dataService.show("cee", + this.id)
        .subscribe( data => {
          this.form.patchValue(this.dataService.current["cee"]);
          this.disableForm();
          this.imagePath = "/assets/background-" + this.dataService.current["cee"].name.toLowerCase() + ".jpg";
        })
      }
    })
  }

  submitForm(values): void {
    if(this.id == "new") {
      this.dataService.create("cee", values).subscribe(
        res =>      {
          this.disableForm();
          this.id = res.json().id;
        }
      );
    }
    else {
      this.dataService.update("cee", this.id, values).subscribe(
        res =>      {
          this.disableForm();
        }
      );
    }
  }

  delete(): void {
    this.dataService.delete("cee", this.id)
    .subscribe(
      res => {
        this.router.navigate(['/cees']);
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    let q = this.form.controls['street'].value + ", " + this.form.controls['city'].value + " " + this.form.controls['zip'].value;
    window.open('http://maps.google.com?q='+q);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.cee.latitude+'+'+this.cee.longitude);
    return false;
  }

  enableForm(): void {
    this.isReadOnly = false;
    let timer = Observable.timer(100,100);
    this.timerSubscription = timer.subscribe(t => {
      var stateSelect = document.getElementById("stateSelect");
      if(stateSelect) {
        this.timerSubscription.unsubscribe();
        stateSelect.removeAttribute("disabled");
      }

      var x = document.getElementsByClassName("source");
      var i;
      for (i = 0; i < x.length; i++) {
          x[i].removeAttribute("disabled");
      }

    });
  }

  disableForm(): void {
    this.route.params.subscribe(params => {
      this.isReadOnly = true;
      let timer = Observable.timer(100,100);
      this.timerSubscription = timer.subscribe(t => {
        var stateSelect = document.getElementById("stateSelect");
        if(stateSelect) {
          this.timerSubscription.unsubscribe();
          stateSelect.setAttribute("disabled", "disabled");
        }

        var x = document.getElementsByClassName("source");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("disabled", "disabled");
        }

      });
    });
  }
}
