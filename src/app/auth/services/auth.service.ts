import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  private _user!: User;

  get user(): User {
    return { ...this._user }
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  storageUser(resp: LoginResponse) {
    localStorage.setItem('token', resp.token)
    this._user = resp.user
  }

  login(email: string, password: string): Observable<Boolean | string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(resp => {
          this.storageUser(resp);
        }),
        map(resp => true),
        catchError(err => of(err.error.msg))
      )
  }

  validateToken() {
    const url = `${this.baseUrl}/renew`;
    const headers: HttpHeaders = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')


    return this.http.get<LoginResponse>(url, { headers })
      .pipe(
        map(resp => {
          this.storageUser(resp)
          return true
        }),
        catchError(err => of(false))
      )

  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.clear()
    this.router.navigateByUrl('/auth/login')
    
  }
}
