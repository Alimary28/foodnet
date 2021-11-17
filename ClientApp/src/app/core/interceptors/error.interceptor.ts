import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            error.statusText = 'Bad request';
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.error.statusCode);
            }
          }
          if (error.status === 401) {
            error.statusText = 'Unauthorised';
            //this.toastr.error(error.statusText === 'OK' ?'Unauthorised' : error.statusText, error.status);
            this.toastr.error(error.error.message, error.error.statusCode);
          }
          if (error.status === 404) {
            error.statusText = 'Not Found';
           this.toastr.error(error.statusText === 'OK' ? 'Not Found' : error.statusText, error.status);
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            error.statusText = 'Internal Server Error';
            //.toastr.error(error.statusText === 'OK' ? 'Internal Server Error' : error.statusText, error.status);
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }

        }
        return throwError(error);
      })
    );
    }

}
