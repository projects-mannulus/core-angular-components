import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudContainerService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  postData(url: string, data: any) {
    return this.http.post(environment.apiUrl + url, data).pipe(
      tap((res) => {
        this.showSuscessMessage('Registro creado correctamente');
      }),
      catchError((err) => {
        this.snackbar.open(err, 'Cerrar');
        throw err;
      })
    );
  }

  deleteData(url: string, id) {
    return this.http.delete(environment.apiUrl + url + '/' + id).pipe(
      tap((res) => {
        this.showSuscessMessage('Registro eliminado correctamente');
      }),
      catchError((err) => {
        this.snackbar.open(err, 'Cerrar');
        throw err;
      })
    );
  }

  putData(url: string, data: any) {
    return this.http.put(environment.apiUrl + url, data).pipe(
      tap((res) => {
        this.showSuscessMessage('Registro actualizado correctamente');
      }),
      catchError((err) => {
        this.snackbar.open(err, 'Cerrar');
        throw err;
      })
    );
  }

  private showSuscessMessage(msg?: string) {
    this.snackbar.open(msg ?? 'Trasaccion exitosa', 'Cerrar');
  }
}
