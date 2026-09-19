import '@angular/compiler';

import { Injector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service';

function createAuthService(platformId: 'browser' | 'server' = 'browser'): AuthService {
  const injector = Injector.create({
    providers: [AuthService, { provide: PLATFORM_ID, useValue: platformId }],
  });

  return runInInjectionContext(injector, () => injector.get(AuthService));
}

describe('AuthService', () => {
  beforeEach(() => {
    globalThis.localStorage?.clear();
  });

  it('authenticates the admin user with the shared mock password', async () => {
    const service = createAuthService();

    const session = await service.login('admin', 'Password123!');

    expect(session).toEqual({
      role: 'admin',
      token: 'mock-jwt-admin-token',
      username: 'admin',
    });
    expect(service.currentUser()).toEqual({
      role: 'admin',
      username: 'admin',
    });
    expect(service.token()).toBe('mock-jwt-admin-token');
  });

  it('authenticates the employee user with the shared mock password', async () => {
    const service = createAuthService();

    const session = await service.login('employee', 'Password123!');

    expect(session).toEqual({
      role: 'employee',
      token: 'mock-jwt-employee-token',
      username: 'employee',
    });
    expect(service.currentUser()).toEqual({
      role: 'employee',
      username: 'employee',
    });
  });

  it('rejects unknown usernames and leaves auth state empty', async () => {
    const service = createAuthService();

    await expect(service.login('guest', 'Password123!')).rejects.toThrowError(
      'Invalid username or password.',
    );
    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
  });

  it('clears the active session on logout', async () => {
    const service = createAuthService();

    await service.login('admin', 'Password123!');
    service.logout();

    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
  });

  it('does not touch browser storage while running on the server', () => {
    const service = createAuthService('server');

    expect(() => service.restoreSession()).not.toThrow();
    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
  });
});
