import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var swal: any;


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private authService: AuthService, private router: Router) { } //, private ngxLoader: NgxUiLoaderService


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.ngxLoader.start();
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        this.authService.logout();
        this.router.navigateByUrl('auth/login');
        return throwError(error);
      }
    })).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        // this.ngxLoader.stop()
      }
    },
      (err: any) => {
    //    this.ngxLoader.stop()
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    // this.ngxLoader.start();
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);


      return this.authService.refreshToken().pipe(

        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          // setTimeout(()=>{
          return next.handle(this.addToken(request, this.authService.getJwtToken()))
          .pipe(tap((event: HttpEvent<any>) => { 
            if (event instanceof HttpResponse) {
            //   this.ngxLoader.stop()
            }
          },
            (err: any) => {
            //  this.ngxLoader.stop()
          }));

        }));


    } else {

      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt))  
          .pipe(tap((event: HttpEvent<any>) => { 
            if (event instanceof HttpResponse) {
            //   this.ngxLoader.stop()
            }
          },
            (err: any) => {
            //  this.ngxLoader.stop()
          }));
        }));
    }
  }
}
