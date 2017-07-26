import {Component, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs/Rx';

import {Angular2TokenService} from 'angular2-token';
import {NotificationsService} from 'angular2-notifications';

import {Flavor} from './flavor';
import {DataService} from '../data.service';

import {MyValidators} from '../shared/my-validators';

@Component({
  selector: 'flavor-detail',
  templateUrl: './flavor-detail.component.html',
  styleUrls: ['../app.component.css', './flavor.css']
})

export class FlavorDetailComponent implements AfterViewInit {
  public component = this;
  public form : FormGroup;
  public isReadOnly:boolean=true;

  public title: string = 'Really delete this flavor?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  public id;
  public flavor;
  public ceeId;
  public ceeName;
  public timerSubscription;

  constructor(public tokenService: Angular2TokenService,
              public dataService: DataService,
              public route: ActivatedRoute,
              public router: Router,
              public location: Location,
              public notificationsService: NotificationsService,
              fb: FormBuilder) {
                this.form = fb.group({
                  'first_name' : [null, Validators.required],
                  'last_name' : [null, Validators.required],
                  'ma' : null,
                  'phone' : null,
                  'cellphone': null,
                  'email' :  null,
                  'street' : null,
                  'city' : null,
                  'state' : null,
                  'zip' : null,
                  'kind' : null,
                  'sunday': null,
                  'monday': null,
                  'tuesday': null,
                  'wednesday': null,
                  'thursday': null,
                  'friday': null,
                  'saturday': null
                })
              }

  ngAfterViewInit() {
    this.getFlavor();
    document.getElementById('top').scrollIntoView(true)
    localStorage.setItem('location', this.location.path());
  }

  getFlavor():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id == "new") {
        this.enableForm();
        this.form.patchValue({
          phone: this.dataService.current['cee'].phone,
          email: this.dataService.current['cee'].email,
          street: this.dataService.current['cee'].street,
          city: this.dataService.current['cee'].city,
          state: this.dataService.current['cee'].state,
          zip: this.dataService.current['cee'].zip,
          kind: this.dataService.current['cee'].kind
        });
      }
      else {
        this.disableForm();

        this.dataService.show("flavor", this.id)
        .subscribe( data => {
          this.form.patchValue(this.dataService.current["flavor"]);

          console.log("first_name: [" + this.form.controls['first_name'].value + "]");
          console.log("phone: [" + this.form.controls['phone'].value + "]");

          this.flavor = data.json();

          this.getCee();
        })
      }
    })
  }

  getCee(): void {
    this.dataService.show("cee", this.flavor.cee_id)
    .subscribe( data => {
      if(!this.flavor['phone']) {
        this.form.controls['phone'].setValue(this.dataService.current['cee'].phone);
      }

      if(!this.flavor['street']) {
        this.form.controls['street'].setValue(this.dataService.current['cee'].street);
      }

      if(!this.flavor['city']) {
        this.form.controls['city'].setValue(this.dataService.current['cee'].city);
      }

      if(!this.flavor['zip']) {
        this.form.controls['zip'].setValue(this.dataService.current['cee'].zip);
      }

      if(!this.flavor['state']) {
        this.form.controls['state'].setValue(this.dataService.current['cee'].state);
      }

      if(!this.flavor['kind']) {
        this.form.controls['kind'].setValue(this.dataService.current['cee'].kind);
      }
    })
  }

  submitForm(values): void {
    if(this.id == "new") {
      values.cee_id = this.dataService.current['cee'].id;
      this.dataService.create("flavor", values).subscribe(
        res =>      {
          this.disableForm();
          this.id = res.json().id;
        }
      );
    }
    else {
      this.dataService.update("flavor", this.id, values).subscribe(
        res =>      {
          this.disableForm();
        }
      );
    }
  }

  delete(): void {
    this.dataService.delete("flavor", this.id)
    .subscribe(
      res => {
        this.location.back();
        // this.router.navigate(['/flavors/'+this.dataService.current["cee"].id]);
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    let q = this.form.controls['street'].value + ", " + this.form.controls['city'].value + " " + this.form.controls['zip'].value;
    window.open('http://maps.google.com?q='+q);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.flavor.latitude+'+'+this.flavor.longitude);
    return false;
  }

  enableForm(): void {
    this.isReadOnly = false;
    let timer = Observable.timer(100,100);
    this.timerSubscription = timer.subscribe(t => {
      var kindSelect = document.getElementById("kindSelect");
      if(kindSelect) {
        this.timerSubscription.unsubscribe();
        kindSelect.removeAttribute("disabled");
      }

      var x = document.getElementsByClassName("weekday");
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
        var kindSelect = document.getElementById("kindSelect");
        if(kindSelect) {
          this.timerSubscription.unsubscribe();
          kindSelect.setAttribute("disabled", "disabled");
        }

        var x = document.getElementsByClassName("weekday");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("disabled", "disabled");
        }

      });
    });
  }
}
