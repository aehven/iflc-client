import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { NotificationsService } from 'angular2-notifications';

interface Options {
  suppressNotification?: boolean
}

@Injectable()
export class DataService {
  constructor(public tokenService: Angular2TokenService,
    public notificationsService: NotificationsService,
    public router: Router,
    public http: Http) {
      let storedCurrent = localStorage.getItem('current');
      if(storedCurrent) {
        this.current = JSON.parse(storedCurrent);
      }
    }

  public current = {};

  baseUrl(resource: string) : string {
    switch(resource.toLowerCase()) {
      case 'user':
        return 'users';

      case 'account':
        return 'accounts'

      case 'contact':
        return 'contacts'

      case 'favorite':
        return 'favorites'

      case 'activity':
        return 'activities'

      default:
        return null;
    }
  }

  index(resource: string, options: Object = {}): Observable<Response> {
    let params = new URLSearchParams();
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            let val = options[key];
            params.set(key, val);
        }
    }

    let res = this.tokenService.get(this.baseUrl(resource), {search: params});

    this.log_response("GET", res);
    return res;
  }

  show(resource: string, id: number): Observable<Response> {
    let res = this.tokenService.get(this.baseUrl(resource)+"/"+id);
    this.log_response("GET", res);

    res.subscribe(
      res => {
        this.current[resource] = res.json();
        localStorage.setItem('current', JSON.stringify(this.current));
      },

      error => {
        this.current[resource] = null;
        localStorage.setItem('current', JSON.stringify(this.current));
      }
  );

    return res;
  }

  update(resource: string, id: number, values: Object = {}, options: Options = {}): Observable<Response> {
    let res =  this.tokenService.put(this.baseUrl(resource)+"/"+id, {[resource]: values});
    this.log_response("PUT", res);
    if(options.suppressNotification != true) {
      this.notify(resource, "update", res);
    }
    return res;
  }

  create(resource: string, values: Object = {}, options: Options = {}): Observable<Response> {
    let res =  this.tokenService.post(this.baseUrl(resource), {[resource]: values});
    this.log_response("POST", res);
    if(options.suppressNotification != true) {
      this.notify(resource, "creation", res);
    }
    return res;
  }

  delete(resource: string, id: number, options: Options = {}): Observable<Response> {
    let res =  this.tokenService.delete(this.baseUrl(resource)+"/"+id);
    this.log_response("DELETE", res);
    if(options.suppressNotification != true) {
      this.notify(resource, "deletion", res);
    }
    return res;
  }

  log_response(method, res): void {
    console.log("currentUserData: " + JSON.stringify(this.tokenService.currentUserData));
    res.subscribe(
      res => {
        console.log("data service: " + method + ": " + res);
        try{
          console.log("data service: \n" + JSON.stringify(res.json()));
        } catch(error) {
          console.log("data service: " + res.text());
        }
      },

      error => {
        console.log("data service: " + method + ": " + res);
        console.error("data service: " + error);
        if(error.status == 401 || error.status == 403) {
          localStorage.setItem('location', "/home");
          this.tokenService.signOut().subscribe(
            res => {
              this.router.navigate(['/login/']);
            },
            error => {
              console.log(error);
              this.router.navigate(['/login/']);
            }
          );
        }
      }
    );
  }

  notify(resource, action, response): void {
    var Resource = resource.charAt(0).toUpperCase() + resource.slice(1);

    response.subscribe(
      res =>      {
        this.notificationsService.success("Yay!", Resource + " " + action + " successful");
      },
      error => {
        this.notificationsService.error("Oops!", Resource + " " + action + " failed");
      }
    );
  }
}
