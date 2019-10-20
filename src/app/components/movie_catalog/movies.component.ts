import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Movie } from 'src/app/model/movie.model';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movies-catalog',
  templateUrl: './movies.component.html',
  styleUrls: ['movies.component.css']
})

export class MoviesCatalogComponent implements OnInit {
  @Output() moviesLoaded = new EventEmitter<Movie>();
  movies: Movie[] = [];
  currentPageIndex = 1;

  constructor(private moviesService: MoviesService) { }

  buildMoviesPage(pageNumber: string = this.currentPageIndex.toString()) {
    this.moviesService.getHighestRatedMovies(pageNumber).subscribe(moviesRes => {
      const fetchedMovies: any = moviesRes.results;
      const randomNumber = Math.floor(Math.random() * fetchedMovies.length);

      // Emit loaded image event
      this.moviesLoaded.emit({
        id: fetchedMovies[randomNumber].id,
        title: fetchedMovies[randomNumber].title,
        description: fetchedMovies[randomNumber].overview,
        imageUrl: 'https://image.tmdb.org/t/p/original' + fetchedMovies[randomNumber].poster_path,
        bgImageUrl: 'https://image.tmdb.org/t/p/original' + fetchedMovies[randomNumber].backdrop_path,
        date: fetchedMovies[randomNumber].release_date,
        isFavourite: true,
        language: fetchedMovies[randomNumber].original_language,
        rating: fetchedMovies[randomNumber].vote_average,
      });

      fetchedMovies.forEach(movie => {
        this.movies.push({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          // tslint:disable-next-line: max-line-length
          imageUrl: movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://i1.wp.com/primabellawomenshealth.com/wp-content/uploads/2015/08/placeholder.jpg?ssl=1',
          bgImageUrl: 'https://image.tmdb.org/t/p/original' + movie.backdrop_path,
          isFavourite: true,
          language: movie.original_language,
          rating: movie.vote_average,
          date: movie.release_date
        });
      });
    });

  }

  selectPage() {
    this.currentPageIndex += 1;
    this.buildMoviesPage(this.currentPageIndex.toString());
  }

  ngOnInit() {
    this.buildMoviesPage();
  }
}
