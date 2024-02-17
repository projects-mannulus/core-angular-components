import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.snackbar.open('Su sesión ha expirado', 'Cerrar', {
            duration: 3000,
          });
          this.authenticationService.logout();
          location.reload();
        } else {
          if (request.method !== 'GET') {
            this.snackbar.open(
              err.error?.message ?? 'No se pudo operar la transaccion',
              'Cerrar',
              {
                panelClass: 'snackbar-error',
              }
            );
          }
        }

        const error = err.error?.message || err?.statusText;
        return throwError(error);
      })
    );
  }
}
