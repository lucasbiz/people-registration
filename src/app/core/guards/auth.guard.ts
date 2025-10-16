import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};
