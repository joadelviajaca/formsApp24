import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  private _user!: User;

  get user(): User {
    return {...this._user}
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Boolean| string>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {email, password})
    .pipe(
      tap( resp => this._user = resp.user),
      map( resp => true),
      catchError( err => of(err.error.msg))
    )
  }
}
