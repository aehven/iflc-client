import { Component, Input, AfterViewInit } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

import { DataService } from '../data.service';
import { Favorite } from './favorite';

@Component({
  selector: 'favorite',
  template: `
  <style>
   span {
     cursor: pointer;
   }
   :host-context(.cee) i {
     color: orange;
   }
   :host-context(.flavor) i {
     color: blue;
   }
  </style>
  <span id="fav-star">
    <i *ngIf="favorite" class="fa fa-star"></i>
    <i *ngIf="!favorite" class="fa fa-star-o"></i>
  </span>
  `
})
export class FavoriteComponent implements AfterViewInit {
  @Input() favoritableId: number;
  // @Input() favoritableType: string;

  constructor(public tokenService: Angular2TokenService, public dataService: DataService) {
  }

  public favorite: Favorite;

  ngAfterViewInit() {
    document.getElementById('fav-star').addEventListener('click', () => this.click());
    this.getFavorite();
  }

  getFavorite():void {
    this.dataService.index("favorite", {
       favoritable_id: this.favoritableId,
       favoritable_type: "Cee"
    })
    .subscribe( data => {
        this.favorite = data.json() as Favorite;
        console.log("getFav: " + JSON.stringify(this.favorite));
      },
      error => {
        console.log("not found");
      });
  }

  click(): void {
    if(this.favorite) {
      this.dataService.delete("favorite", this.favorite.id, {suppressNotification: true}).subscribe(
        res => {
          this.favorite = null;
        }
      )
    }
    else {
      this.dataService.create("favorite",
        {
          favoritable_id: this.dataService.current['cee'].id,
          favoritable_type: "Cee"
        },
        {suppressNotification: true}
      ).subscribe(
        res => {
          this.favorite = res.json() as Favorite;
        }
      );
    }
  }
}
