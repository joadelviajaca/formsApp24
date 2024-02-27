import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { LoginResponse, User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  private _user = signal<User|null>(null);
  user(): Signal<User|null> {
    return this._user.asReadonly();
  }

  private _authenticated = signal<boolean>(false); 
  authenticated = computed(() => this._authenticated.asReadonly()); 

  // get user(): User {
  //   return { ...this._user }
  // }

  // user = computed(()=> this._user.asReadonly)

  constructor(private http: HttpClient,
              private router: Router) {
                if (localStorage.getItem('token')) {
                  this.validateToken()
                  .subscribe()
                }
               }

  storageUser(resp: LoginResponse) {
    localStorage.setItem('token', resp.token)
    this._user.set(resp.user) ;
    this._authenticated.set(true);
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
    this._authenticated.set(false);
    // localStorage.clear()
    this.router.navigateByUrl('/auth/login')
    
  }
}
