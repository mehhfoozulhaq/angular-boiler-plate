import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string = null;
  authSubject = new BehaviorSubject(false);
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {
      
  }

  isAuthenticated() {
    // if( this.token != null )
    return this.authSubject.asObservable();
    // else
    //   return false;
  }

  getToken() {
    return this.token;
  }

  refreshToken(){
      return this.http.post<any>(`/api/v1/auth/refresh`, {
        'refresh_token': this.getRefreshToken() ,
        'type': 'reauth',
        'device_type': 'web_browser',
        'device_token': 'web_browser',
      }).pipe(  tap( (tokens: any) => {
        this.storeTokens(tokens.result[0].token);
       })); 
  }

  verifyAuthToken() {
    //  = this.getToken();
    return true;
  }

  login(data): Observable<any> {
    return this.http.post(`/api/login`, data).pipe(
      tap(async (result: any) => {
        return result;
      })
    );
  }

  register(data): Observable<any> {
    return this.http.post(`/api/register`, data).pipe(
      tap(async (result: any) => {
        return result;
      })
    );
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    this.authSubject.next(false);
  }




  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: string) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  

   storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
