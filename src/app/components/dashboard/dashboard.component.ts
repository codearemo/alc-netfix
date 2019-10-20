import { Component } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  heroMovie: Movie;

  buildHeroImage(movie: Movie) {
    this.heroMovie = movie;
  }
}
