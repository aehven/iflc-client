import {Component, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs/Rx';

import {Angular2TokenService} from 'angular2-token';
import {NotificationsService} from 'angular2-notifications';

import {User} from './user';
import {DataService} from '../data.service';

import {MyValidators} from '../shared/my-validators';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../app.component.css', './user.css']
})
export class UserDetailComponent implements AfterViewInit {
  public component = this;
  public form : FormGroup;
  public isReadOnly:boolean=true;

  public title: string = 'Really delete this user?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  public timerSubscription;
  public id;

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
                  'phone' : null,
                  'address' : null,
                  'email' :  [null, [Validators.required, MyValidators.mailFormat]],
                  'role' : "regular",
                  'password' : '',
                  'confirmPassword': ''
                },
                {validator: MyValidators.matchingPasswords('password', 'confirmPassword')})
              }

  ngAfterViewInit() {
    this.getUser();
    localStorage.setItem('location', this.location.path());
  }

  getUser():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id == 'new') {
        this.enableForm();
      }
      else {
        this.dataService.show("user", + this.id)
        .subscribe( data => {
          this.form.patchValue(this.dataService.current["user"]);
          this.disableForm();
        })
      }
    })
  }

  submitForm(values): void {
    if(this.id == "new") {
      this.dataService.create("user", values).subscribe(
        res =>      {
          this.disableForm();
          this.id = res.json().id;
        }
      );
    }
    else {
      this.dataService.update("user", this.id, values).subscribe(
        res =>      {
          this.disableForm();
        }
      );
    }
  }

  delete(): void {
    this.dataService.delete("user", this.id)
    .subscribe(
      res => {
        this.router.navigate(['/users']);
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    let q = this.form.controls['address'].value;
    window.open('http://maps.google.com?q='+q);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.user.latitude+'+'+this.user.longitude);
    return false;
  }

  enableForm(): void {
    this.isReadOnly = false;
    let timer = Observable.timer(100,100);
    this.timerSubscription = timer.subscribe(t => {
      var roleSelect = document.getElementById("roleSelect");
      if(roleSelect) {
        this.timerSubscription.unsubscribe();
        roleSelect.removeAttribute("disabled");
      }
    });
  }

  disableForm(): void {
    this.route.params.subscribe(params => {
      this.isReadOnly = true;
      let timer = Observable.timer(100,100);
      this.timerSubscription = timer.subscribe(t => {
        var roleSelect = document.getElementById("roleSelect");
        if(roleSelect) {
          this.timerSubscription.unsubscribe();
          roleSelect.setAttribute("disabled", "disabled");
        }
      });
    });
  }
}
