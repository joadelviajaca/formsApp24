import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './list-users.component.html'
})
export class ListUsersComponent implements OnInit{

  users!: Observable<User[]>;

  constructor(private usersService: UserService){}

  ngOnInit(){
    this.users = this.usersService.getUsers();
  }

}
