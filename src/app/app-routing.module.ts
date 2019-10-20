import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SearchedMovieComponent } from './components/searched_movie/searched-movie.component';


const routes: Routes = [
  {
    path: 'favourites', component: FavouritesComponent
  },
  {
    path: 'search/:title', component: SearchedMovieComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'movie/:id', component: MovieDetailComponent
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
