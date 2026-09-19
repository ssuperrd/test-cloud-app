import '@angular/compiler';

import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injector, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { firstValueFrom, throwError, of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from '../auth/auth.service';
import { authTokenInterceptor } from './auth-token.interceptor';

function createAuthContext() {
  const injector = Injector.create({
    providers: [AuthService, { provide: PLATFORM_ID, useValue: 'browser' }],
  });

  return {
    authService: runInInjectionContext(injector, () => injector.get(AuthService)),
    injector,
  };
}

describe('authTokenInterceptor', () => {
  beforeEach(() => {
    globalThis.localStorage?.clear();
  });

  it('does not attach an Authorization header when no token exists', async () => {
    const { injector } = createAuthContext();
    const request = new HttpRequest('GET', '/api/mock');

    const response = await runInInjectionContext(injector, () =>
      firstValueFrom(
        authTokenInterceptor(request, (nextRequest) => {
          expect(nextRequest.headers.has('Authorization')).toBe(false);
          return of(new HttpResponse({ status: 200 }));
        }),
      ),
    );

    expect(response).toBeInstanceOf(HttpResponse);
    expect((response as HttpResponse<unknown>).status).toBe(200);
  });

  it('attaches the dummy Bearer token after a successful mock login', async () => {
    const { authService, injector } = createAuthContext();
    const request = new HttpRequest('GET', '/api/mock');

    await authService.login('admin', 'Password123!');

    const response = await runInInjectionContext(injector, () =>
      firstValueFrom(
        authTokenInterceptor(request, (nextRequest) => {
          expect(nextRequest.headers.get('Authorization')).toBe('Bearer mock-jwt-admin-token');
          return of(new HttpResponse({ status: 200 }));
        }),
      ),
    );

    expect(response).toBeInstanceOf(HttpResponse);
    expect((response as HttpResponse<unknown>).status).toBe(200);
  });

  it('clears the local mock session when a 401 response is observed', async () => {
    const { authService, injector } = createAuthContext();
    const request = new HttpRequest('GET', '/api/mock');

    await authService.login('employee', 'Password123!');

    await expect(
      runInInjectionContext(injector, () =>
        firstValueFrom(
          authTokenInterceptor(request, () =>
            throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })),
          ),
        ),
      ),
    ).rejects.toMatchObject({ status: 401 });
    expect(authService.currentUser()).toBeNull();
    expect(authService.token()).toBeNull();
  });
});
