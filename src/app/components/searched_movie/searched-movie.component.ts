import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './searched-movie.component.html',
  styleUrls: ['./searched-movie.component.css']
})
export class SearchedMovieComponent implements OnInit {
  searchedResult: any[];
  searchedParameter: string;
  isLoading = true;

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  buildImageUrl(imgSrc) {
    // tslint:disable-next-line: max-line-length
    return imgSrc ? 'https://image.tmdb.org/t/p/original' + imgSrc : 'https://i1.wp.com/primabellawomenshealth.com/wp-content/uploads/2015/08/placeholder.jpg?ssl=1';
  }

  showMovieDetails(movieId) {
    this.router.navigate(['/movie', movieId]);
  }

  searchByMovieByTitle(formDetails: NgForm) {
    if (formDetails.invalid || formDetails.value.movieTitle.trim() === '') {
      return;
    }

    // Route
    this.router.navigate(['/search', formDetails.value.movieTitle]);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('title')) {
        this.searchedParameter = paramMap.get('title');
        this.moviesService.getMoviesBySearchTitle(paramMap.get('title')).subscribe(searchResult => {
          this.searchedResult = searchResult.results.sort((a, b) => a.title > b.title ? 1 : -1);
        });
      }

      this.isLoading = false;
    });
  }
}
