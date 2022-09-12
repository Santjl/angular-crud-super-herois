import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

// rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _snackBar: MatSnackBar
  ) {
    //
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error) => {
        // get HTTP error
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            // case 401:
            //   return this.handle401Error(request, next, error);

            default:
              return throwError(error);
          }
        }

        // default error
        return throwError(() => error);
      })
    );
  }
}
