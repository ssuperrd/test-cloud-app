import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AuthRole = 'admin' | 'employee';

export interface AuthUser {
  readonly role: AuthRole;
  readonly username: string;
}

export interface AuthSession extends AuthUser {
  readonly token: string;
}

type MockCredential = {
  readonly password: string;
  readonly role: AuthRole;
  readonly token: string;
};

const STORAGE_KEY = 'app-ui.mock-auth-session';

const MOCK_CREDENTIALS: Record<string, MockCredential> = {
  admin: {
    password: 'Password123!',
    role: 'admin',
    token: 'mock-jwt-admin-token',
  },
  employee: {
    password: 'Password123!',
    role: 'employee',
    token: 'mock-jwt-employee-token',
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AuthUser | null>(null);
  readonly token = signal<string | null>(null);

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.restoreSession();
  }

  async login(username: string, password: string): Promise<AuthSession> {
    const normalizedUsername = username.trim();
    const credential = MOCK_CREDENTIALS[normalizedUsername];

    if (!credential || credential.password !== password) {
      this.clearSession();
      throw new Error('Invalid username or password.');
    }

    const session: AuthSession = {
      role: credential.role,
      token: credential.token,
      username: normalizedUsername,
    };

    this.applySession(session);

    return session;
  }

  logout(): void {
    this.clearSession();
  }

  restoreSession(): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    const rawSession = storage.getItem(STORAGE_KEY);

    if (!rawSession) {
      return;
    }

    try {
      const session = JSON.parse(rawSession) as Partial<AuthSession>;

      if (
        session.username === 'admin' || session.username === 'employee'
      ) {
        const credential = MOCK_CREDENTIALS[session.username];

        if (session.role === credential.role && session.token === credential.token) {
          this.currentUser.set({
            role: credential.role,
            username: session.username,
          });
          this.token.set(credential.token);
          return;
        }
      }
    } catch {
      storage.removeItem(STORAGE_KEY);
    }

    this.clearSession();
  }

  clearSessionFromAuthError(status: number): void {
    if (status === 401 || status === 403) {
      this.clearSession();
    }
  }

  private applySession(session: AuthSession): void {
    this.currentUser.set({
      role: session.role,
      username: session.username,
    });
    this.token.set(session.token);

    const storage = this.getStorage();
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }

  private clearSession(): void {
    this.currentUser.set(null);
    this.token.set(null);

    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
  }

  private getStorage(): Storage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return globalThis.localStorage ?? null;
  }
}
