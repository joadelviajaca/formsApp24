import { CanMatchFn } from '@angular/router';

export const validateTokenGuard: CanMatchFn = (route, segments) => {
  return true;
};
