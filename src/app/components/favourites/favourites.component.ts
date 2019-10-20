import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favouriteMovies = [];
  listOfObservables;
  isLoading = true;

  constructor(private moviesService: MoviesService, private router: Router) { }

  buildImageUrl(imageScr) {
    return 'https://image.tmdb.org/t/p/w500' + imageScr;
  }

  routeToMovieDetails(movieId) {
    this.router.navigate(['/movie', movieId]);
  }

  ngOnInit() {
    this.moviesService.getMovieById();
    this.listOfObservables = this.moviesService.getMovieById();
    this.listOfObservables.forEach(observableItem => {
      observableItem.subscribe(movie => {
        this.favouriteMovies.push(movie);
        this.favouriteMovies.sort((a, b) => a.title > b.title ? 1 : -1);
      });
    });
    this.isLoading = false;
  }
}
