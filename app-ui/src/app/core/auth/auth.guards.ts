import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthRole, AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser() ? true : router.createUrlTree(['/login']);
};

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUser();
  const requiredRole = route.data['role'] as AuthRole | undefined;

  if (!currentUser) {
    return router.createUrlTree(['/login']);
  }

  if (!requiredRole || currentUser.role === requiredRole) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
