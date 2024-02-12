import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UsersList } from '../../auth/interfaces/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    // const headers : HttpHeaders = new HttpHeaders()
    // .set('x-token', localStorage.getItem('token')|| '')
    // return this.http.get<UsersList>(this.baseUrl, {headers})
    return this.http.get<UsersList>(this.baseUrl)
    .pipe(
        map( resp => resp.users)
      )
  }
}
