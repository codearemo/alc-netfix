import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  MostPopularMovie: Movie;
  isFavouriteList: any[] = JSON.parse(sessionStorage.getItem('favouriteMovies')) || [];

  constructor(private http: HttpClient, private router: Router) { }

  getHighestRatedMovies(page: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ results: [] }>('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9100531e04995c3938a66cd379c6cff5&page=' + page);
  }

  getMoviesBySearchTitle(searchedTitle: string) {
    // Split searched input to an array
    const listOfKeyWords: string[] = searchedTitle.split(' ');
    //
    let totalWords = '';
    // Populate query strings
    listOfKeyWords.forEach((word, keyWordIndex) => {
      if (keyWordIndex === 0) {
        totalWords += word.toLowerCase();
      } else {
        totalWords += '+' + word.toLowerCase();
      }
    });

    // tslint:disable-next-line: max-line-length
    return this.http.get<any>(`http://api.themoviedb.org/3/search/movie?api_key=9100531e04995c3938a66cd379c6cff5&query=${totalWords}`);
  }

  getMovieDetails(movieId) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`http://api.themoviedb.org/3/movie/${movieId}?api_key=9100531e04995c3938a66cd379c6cff5&append_to_response=trailers,credits`);
  }

  getMovieById() {
    return this.isFavouriteList.map(favMovieId => {
      // tslint:disable-next-line: max-line-length
      return this.http.get<any>(`http://api.themoviedb.org/3/movie/${favMovieId}?api_key=9100531e04995c3938a66cd379c6cff5`);
    });
  }

  // Set Movies to is favourite
  saveFavouriteMoviesList(movieID: string) {
    if (this.isFavouriteList.includes(movieID)) {
      this.isFavouriteList.forEach((itemMovie, index) => {
        if (itemMovie === movieID) {
          this.isFavouriteList.splice(index, 1);
        }
      });
    } else {
      this.isFavouriteList.push(movieID);
    }
    sessionStorage.setItem('favouriteMovies', JSON.stringify(this.isFavouriteList));
  }
}
