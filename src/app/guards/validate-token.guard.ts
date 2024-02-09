import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const validateTokenGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  authService.validateToken()
  .subscribe(
    {
      next: (resp) =>  true,
      error: (err) => false
    }
  )
  return true;
};
