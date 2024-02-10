import { CanMatchFn } from '@angular/router';

export const validateToGuard: CanMatchFn = (route, segments) => {
  return true;
};
