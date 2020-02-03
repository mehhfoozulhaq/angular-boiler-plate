import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.css']
})

export class FilmViewComponent implements OnInit {
  
  isLoggedIn: string = 'No';
  apiError = null;
  film: any;
  slug: string = null;

  constructor(private filmService: FilmService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');

    this.slug = this.activatedRoute.snapshot.params.slug;

    this.filmService.getFilm(this.slug).subscribe( film => {
      
      if( film.data ) {
        this.film = film.data;
      }
      else {
        this.apiError = film.data.message;
      }
    }, (err: HttpErrorResponse) => {
      this.apiError = err;
    })

  }

}
