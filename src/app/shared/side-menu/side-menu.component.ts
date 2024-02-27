import { JsonPipe, NgFor } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/user';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, JsonPipe],
  templateUrl: './side-menu.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }
    `
  ]
})
export class SideMenuComponent {

  constructor(private authService: AuthService){
    
  }

  authenticated = this.authService.authenticated();
  user = this.authService.user();

  templateMenu: MenuItem[] = [
    {
      texto: 'Básicos',
      ruta: './template/basicos'
    },
    {
      texto: 'Dinámicos',
      ruta: './template/dinamicos'
    },
    {
      texto: 'Switches',
      ruta: './template/switches'
    },
  ];

  reactiveMenu: MenuItem[] = [
    {
      texto: 'Básicos',
      ruta: './reactive/basicos'
    },
    {
      texto: 'Dinámicos',
      ruta: './reactive/dinamicos'
    },
    {
      texto: 'Switches',
      ruta: './reactive/switches'
    },
  ];

  authMenu: MenuItem[] = [
    {
      texto: 'Register',
      ruta: './auth/register'
    },
    {
      texto: 'Login',
      ruta: './auth/login'
    }
  ]

  countriesMenu: MenuItem[] = [
    {
      texto: 'Paises',
      ruta: './countries'
    }
  ]

  usersMenu: MenuItem[] = [
    {
      texto: 'Listar usuarios',
      ruta: './users/list'
    }
  ]

  logout(){
    this.authService.logout();
  }

}
