import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;

  constructor(public moviesService: MoviesService) { }


  getBackPostalTitle() {
    return this.movie ? this.movie.title : '';
  }

  addFavouraite(movieEvent) {
    // Prevent angular routing
    movieEvent.stopPropagation();
    // Prevent browser default action
    movieEvent.preventDefault();

    const movieID = movieEvent.target.id;
    this.moviesService.saveFavouriteMoviesList(movieID);
    // Update catalog
    this.movie.isFavourite = this.moviesService.isFavouriteList.includes(this.movie.id.toString());
  }

  ngOnInit() {
    this.movie.isFavourite = this.moviesService.isFavouriteList.includes(this.movie.id.toString());
  }
}
