import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, User } from '../../shared/interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:3000/auth'
  private _user!: User;

  get user(): User {
    return {...this._user}
  }

  constructor(private http: HttpClient) { }

  login( email: string, password: string){
    

    return this.http.post<Auth>(`${this.baseUrl}/login`, {email, password})
      .pipe(
        tap( resp => {
          if(resp.user) {
            this._user = resp.user;
          }
        }),
        map( resp => true),
        catchError( err => of(err.error.msg))
      )
  }
}
