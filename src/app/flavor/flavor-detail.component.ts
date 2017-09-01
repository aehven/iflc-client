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
                  'name' : [null, Validators.required],
                  'color' : [null, Validators.required]
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
      }
      else {
        this.disableForm();

        this.dataService.show("flavor", this.id)
        .subscribe( data => {
          this.form.patchValue(this.dataService.current["flavor"]);

          this.flavor = data.json();
        })
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
  }

  disableForm(): void {
    this.route.params.subscribe(params => {
      this.isReadOnly = true;
      let timer = Observable.timer(100,100);
    });
  }
}
