import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(public dataService: DataService, public router: Router) {
  }

  ngAfterViewInit(): void {
    document.getElementById('home').scrollIntoView(true);
    // this.router.navigate([localStorage.getItem('location')]);
    this.cees();
  }

  cees(): void {
    console.log("Cees");
    this.router.navigate(['/cees']);
  }

  flavors(): void {
    console.log("Flavors");
    this.router.navigate(['/flavors']);
  }
}
