import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UsersService } from '../../shared/services/users.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  users!: Observable<User[]>;

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.users = this.usersService.getUsers()

    
  }




}
