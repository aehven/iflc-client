import {Component, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs/Rx';

import {Angular2TokenService} from 'angular2-token';
import {NotificationsService} from 'angular2-notifications';

import {Contact} from './contact';
import {DataService} from '../data.service';

import {MyValidators} from '../shared/my-validators';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['../app.component.css', './contact.css']
})

export class ContactDetailComponent implements AfterViewInit {
  public component = this;
  public form : FormGroup;
  public isReadOnly:boolean=true;

  public title: string = 'Really delete this contact?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  public id;
  public contact;
  public accountId;
  public accountName;
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
    this.getContact();
    document.getElementById('top').scrollIntoView(true)
    localStorage.setItem('location', this.location.path());
  }

  getContact():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id == "new") {
        this.enableForm();
        this.form.patchValue({
          phone: this.dataService.current['account'].phone,
          email: this.dataService.current['account'].email,
          street: this.dataService.current['account'].street,
          city: this.dataService.current['account'].city,
          state: this.dataService.current['account'].state,
          zip: this.dataService.current['account'].zip,
          kind: this.dataService.current['account'].kind
        });
      }
      else {
        this.disableForm();

        this.dataService.show("contact", this.id)
        .subscribe( data => {
          this.form.patchValue(this.dataService.current["contact"]);

          console.log("first_name: [" + this.form.controls['first_name'].value + "]");
          console.log("phone: [" + this.form.controls['phone'].value + "]");

          this.contact = data.json();

          this.getAccount();
        })
      }
    })
  }

  getAccount(): void {
    this.dataService.show("account", this.contact.account_id)
    .subscribe( data => {
      if(!this.contact['phone']) {
        this.form.controls['phone'].setValue(this.dataService.current['account'].phone);
      }

      if(!this.contact['street']) {
        this.form.controls['street'].setValue(this.dataService.current['account'].street);
      }

      if(!this.contact['city']) {
        this.form.controls['city'].setValue(this.dataService.current['account'].city);
      }

      if(!this.contact['zip']) {
        this.form.controls['zip'].setValue(this.dataService.current['account'].zip);
      }

      if(!this.contact['state']) {
        this.form.controls['state'].setValue(this.dataService.current['account'].state);
      }

      if(!this.contact['kind']) {
        this.form.controls['kind'].setValue(this.dataService.current['account'].kind);
      }
    })
  }

  submitForm(values): void {
    if(this.id == "new") {
      values.account_id = this.dataService.current['account'].id;
      this.dataService.create("contact", values).subscribe(
        res =>      {
          this.disableForm();
          this.id = res.json().id;
        }
      );
    }
    else {
      this.dataService.update("contact", this.id, values).subscribe(
        res =>      {
          this.disableForm();
        }
      );
    }
  }

  delete(): void {
    this.dataService.delete("contact", this.id)
    .subscribe(
      res => {
        this.location.back();
        // this.router.navigate(['/contacts/'+this.dataService.current["account"].id]);
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    let q = this.form.controls['street'].value + ", " + this.form.controls['city'].value + " " + this.form.controls['zip'].value;
    window.open('http://maps.google.com?q='+q);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.contact.latitude+'+'+this.contact.longitude);
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
