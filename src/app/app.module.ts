import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { MoviesCatalogComponent } from './components/movie_catalog/movies.component';
import { MovieItemComponent } from './components/movie_item/movie.component';
import { FormatTextPipe } from './pipes/text-format.pipe';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RateDecimalPipe } from './pipes/make-decimal.pipe';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RunTimePipe } from './pipes/run-time.pipe';
import { SearchedMovieComponent } from './components/searched_movie/searched-movie.component';

@NgModule({
  declarations: [
    FormatTextPipe,
    RateDecimalPipe,
    RunTimePipe,
    AppComponent,
    HeaderComponent,
    HeroComponent,
    MoviesCatalogComponent,
    MovieItemComponent,
    MovieDetailComponent,
    DashboardComponent,
    FavouritesComponent,
    SearchedMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
