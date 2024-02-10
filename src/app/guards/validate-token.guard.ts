import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const validateTokenGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.validateToken()
    // .pipe(
    //   tap(valid => {
    //     if (!valid) (

    //       router.navigateByUrl('/auth/login')
    //     )

    //   })
    // )
};
