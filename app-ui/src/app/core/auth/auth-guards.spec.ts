import '@angular/compiler';

import { Injector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service';
import { authGuard, roleGuard } from './auth.guards';

type AuthContext = {
  authService: AuthService;
  injector: Injector;
};

function createAuthContext(): AuthContext {
  const router = {
    createUrlTree: (commands: string[]) => commands.join(''),
  } as unknown as Router;
  const injector = Injector.create({
    providers: [
      AuthService,
      { provide: PLATFORM_ID, useValue: 'browser' },
      { provide: Router, useValue: router },
    ],
  });

  return {
    authService: runInInjectionContext(injector, () => injector.get(AuthService)),
    injector,
  };
}

describe('auth guards', () => {
  beforeEach(() => {
    globalThis.localStorage?.clear();
  });

  it('allows authenticated users through authGuard', async () => {
    const { authService, injector } = createAuthContext();

    await authService.login('employee', 'Password123!');

    const result = runInInjectionContext(injector, () => authGuard({} as never, {} as never));

    expect(result).toBe(true);
  });

  it('redirects unauthenticated users to /login through authGuard', () => {
    const { injector } = createAuthContext();

    const result = runInInjectionContext(injector, () => authGuard({} as never, {} as never));

    expect(result).toBe('/login');
  });

  it('allows matching roles through roleGuard', async () => {
    const { authService, injector } = createAuthContext();

    await authService.login('admin', 'Password123!');

    const result = runInInjectionContext(injector, () =>
      roleGuard({ data: { role: 'admin' } } as never, {} as never),
    );

    expect(result).toBe(true);
  });

  it('redirects role mismatches to /login through roleGuard', async () => {
    const { authService, injector } = createAuthContext();

    await authService.login('employee', 'Password123!');

    const result = runInInjectionContext(injector, () =>
      roleGuard({ data: { role: 'admin' } } as never, {} as never),
    );

    expect(result).toBe('/login');
  });
});
