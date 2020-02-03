import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  }


  getFilms(): Observable<any> {
    return this.http.get(`/api/films`).pipe(
      tap(async (result: any) => {
        return result;
      })
    );
  }

  getFilm(slug): Observable<any> {
    return this.http.get(`/api/films/${slug}`).pipe(
      tap(async (result: any) => {
        return result;
      })
    );
  }

  saveComment(data): Observable<any> {
    return this.http.post(`/api/comment`, data, this.httpOptions).pipe(
      tap(async (result: any) => {
        return result;
      })
    );
  }

}
