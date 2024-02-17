import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar) {}

  intercept(request: any, next: any): Observable<HttpEvent<Response>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: event.body?.data });
        }
        return event;
      })
    );
  }
}
