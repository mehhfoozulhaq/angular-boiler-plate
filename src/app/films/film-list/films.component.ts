import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  apiError = null;
  films: any = [];

  constructor(private filmService: FilmService) { }

  ngOnInit() {

    this.filmService.getFilms().subscribe( films => {
      
      if( films.data.status ) {
        this.films = films.data.result;
      }
      else {
        this.apiError = films.data.message;
      }
    }, (err: HttpErrorResponse) => {
      this.apiError = err;
    })

  }

}
