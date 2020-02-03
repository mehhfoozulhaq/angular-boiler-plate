import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard'

import { FilmsComponent } from './film-list/films.component';
import { FilmViewComponent } from './film-view/film-view.component';

const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: ':slug', component: FilmViewComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
