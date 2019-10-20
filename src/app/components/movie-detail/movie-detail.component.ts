import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieDetail: any;
  moviePicArt: string;
  cast: [];
  crew: [];
  teasers: [];
  isFavourite: boolean;

  constructor(private activatedRouter: ActivatedRoute, private moviesService: MoviesService, public sanitizer: DomSanitizer) { }

  buildImgLink(profilePath) {
    // tslint:disable-next-line: max-line-length
    return profilePath ? 'https://image.tmdb.org/t/p/w500' + profilePath : 'https://coveprograms.com/wp-content/uploads/2019/04/Female-Profile-Placeholder.jpg';
  }

  buildTrailerVideo(videoLink) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoLink}`);
  }

  addFavouraite(movieEvent) {
    const movieID = movieEvent.target.id;
    this.moviesService.saveFavouriteMoviesList(movieID);
    // Update catalog
    this.isFavourite = this.moviesService.isFavouriteList.includes(this.movieDetail.id.toString());
  }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      let movieInViewID: string;
      if (paramMap.has('id')) {
        movieInViewID = paramMap.get('id');
      }

      // Handle http
      this.moviesService.getMovieDetails(movieInViewID).subscribe(movie => {
        this.movieDetail = movie;
        // console.log(this.movieDetail);
        // tslint:disable-next-line: max-line-length
        this.moviePicArt = this.movieDetail.poster_path ? 'https://image.tmdb.org/t/p/w500' + this.movieDetail.poster_path : 'https://i1.wp.com/primabellawomenshealth.com/wp-content/uploads/2015/08/placeholder.jpg?ssl=1';
        this.cast = this.movieDetail.credits.cast.splice(0, 12);
        this.crew = this.movieDetail.credits.crew.splice(0, 12);
        this.teasers = this.movieDetail.trailers.youtube;
        // Set default favourite
        this.isFavourite = this.moviesService.isFavouriteList.includes(this.movieDetail.id.toString());
      });
    });
  }
}
