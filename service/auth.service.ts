import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, forkJoin, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { AuthTokenResponse } from '@core/models/auth.token.response';
import { RoleResponseDTO } from '@core/models/role';
import { PersonDTO } from '@core/models/auth.person.response';
import { Router } from '@angular/router';

@Injectable({
  //providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private currentTokenSubject: BehaviorSubject<AuthTokenResponse>;
  public currentToken: Observable<AuthTokenResponse>;

  constructor(private http: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')) || null
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentTokenSubject = new BehaviorSubject<AuthTokenResponse>(
      JSON.parse(localStorage.getItem('currentToken')) || null
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): AuthTokenResponse {
    return this.currentTokenSubject.value;
  }

  login(username: string, password: string) {
    console.log(this.currentUserValue, this.currentTokenValue);
    if (this.currentUserValue != null) {
      console.log('ya esta logueado');
    }
    return Observable.create((observer) => {
      this.http
        .post<AuthTokenResponse>(`${environment.apiUrl}/auth/login`, {
          username,
          password,
        })
        .pipe(
          catchError((err) => {
            observer.error(err);
            return of(null);
          })
        )
        .subscribe((res) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentToken', JSON.stringify(res));
          this.currentTokenSubject.next(res);
          //informacion del usuario
          this.getInfoUser().subscribe(({ dataUser, rol }) => {
            const user: User = {
              id: dataUser.id,
              img: dataUser.imageUrl,
              email: dataUser.address, //TODO: revisar como se obtiene la informacion del usuario
              username: dataUser.name,
              fullName: dataUser.fullName,
              role: rol.name,
              token: res.accessToken,
              person: dataUser,
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return observer.next(user);
          });
        });
    });
  }

  private getCurrentUser() {
    return this.http.get<PersonDTO>(`${environment.apiUrl}/person/get`);
  }

  private getCurrentRol() {
    return this.http.get<RoleResponseDTO>(
      `${environment.apiUrl}/rol/getCurrentRol`
    );
  }

  private getInfoUser() {
    return forkJoin({
      dataUser: this.getCurrentUser(),
      rol: this.getCurrentRol(),
    });
  }

  changePassword(data:{password: string, newPassword: string}) {
    return this.http.put<any>(`${environment.apiUrl}/auth/changePassword`, data);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    this.currentUserSubject.next(null);
    this.currentTokenSubject.next(null);
    return of({ success: false });
  }
}
