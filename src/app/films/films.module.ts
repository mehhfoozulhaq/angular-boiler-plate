import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FilmsRoutingModule } from './films-routing.module';

import { FilmsComponent } from './film-list/films.component';
import { FilmViewComponent } from './film-view/film-view.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';


@NgModule({
  declarations: [FilmsComponent, FilmViewComponent, WriteCommentComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FilmsModule { }
