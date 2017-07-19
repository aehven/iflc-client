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
    this.router.navigate([localStorage.getItem('location')]);
  }

  accounts(): void {
    console.log("Accounts");
    this.router.navigate(['/accounts']);
  }

  contacts(): void {
    console.log("Contacts");
    this.router.navigate(['/contacts']);
  }
}
