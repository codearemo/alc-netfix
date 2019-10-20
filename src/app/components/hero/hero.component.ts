import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent {
  @Input() recievedHeroMovie: Movie;
  showingSearchInput: boolean;

  constructor(private router: Router, private moviesService: MoviesService) { }

  showMovieDetails(event) {
    const movieId = event.target.id;
    this.router.navigate(['/movie', movieId]);
  }

  searchMovie(movieName: NgForm) {
    if (movieName.invalid || movieName.value.movieTosearch.trim() === '') {
      return;
    }
    // Search Title
    // this.moviesService.getMoviesBySearchTitle(movieName.value.movieTosearch);
    this.router.navigate(['/search', movieName.value.movieTosearch]);
  }

  showSearchInput(e) {

    document.querySelectorAll('.search-icon-action').forEach(iconPiece => {
      iconPiece.classList.add('hide-icon');
    });

    document.querySelectorAll('.close-search-icon-action').forEach(iconPiece => iconPiece.classList.remove('hide-icon'));


    document.querySelector('input').classList.add('show-search');
  }

  hideSearchInput(e) {

    document.querySelectorAll('.close-search-icon-action').forEach(iconPiece => iconPiece.classList.add('hide-icon'));

    document.querySelectorAll('.search-icon-action').forEach(iconPiece => iconPiece.classList.remove('hide-icon'));

    document.querySelector('input').classList.remove('show-search');
  }

  getBackDropImageUrl() {
    return this.recievedHeroMovie ? this.recievedHeroMovie.bgImageUrl : '';
  }

  getBackPostalImageUrl() {
    return this.recievedHeroMovie ? this.recievedHeroMovie.imageUrl : '';
  }

  getBackPostalTitle() {
    return this.recievedHeroMovie ? this.recievedHeroMovie.title : '';
  }
}
