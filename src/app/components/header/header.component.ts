import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  showingNav = false;

  constructor(private router: Router) { }

  routePageToHome() {
    this.showingNav = !this.showingNav;
    this.router.navigate(['/']);
  }
  routePageToFavourite() {
    this.showingNav = !this.showingNav;
    this.router.navigate(['/favourites']);
  }
  routePageToAuth() {
    this.showingNav = !this.showingNav;
    // this.router.navigate(['/']);
  }
}
