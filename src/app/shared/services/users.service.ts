import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UsersResponse } from '../interfaces/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _baseUrl: string = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    // const token = localStorage.getItem('token') || '';
    // const headers: HttpHeaders = new HttpHeaders()
    // .set('x-token', token)
    return this.http.get<UsersResponse>(this._baseUrl)
    .pipe(
      map( resp => resp.users)
    )
  }
}
