import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

type ValidationState = {
  password?: string;
  username?: string;
};

@Component({
  selector: 'app-login-page',
  styleUrl: './login-page.component.css',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  readonly username = signal('');
  readonly password = signal('');
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly validation = signal<ValidationState>({});

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async submit(): Promise<void> {
    const nextValidation: ValidationState = {};
    const username = this.username().trim();
    const password = this.password().trim();

    if (!username) {
      nextValidation.username = 'Username is required.';
    }

    if (!password) {
      nextValidation.password = 'Password is required.';
    }

    this.validation.set(nextValidation);
    this.errorMessage.set('');

    if (Object.keys(nextValidation).length > 0) {
      return;
    }

    this.loading.set(true);

    try {
      const session = await this.authService.login(username, password);
      await this.router.navigateByUrl(this.getDashboardPath(session.role));
    } catch {
      this.errorMessage.set('Use admin or employee with the shared password to continue.');
    } finally {
      this.loading.set(false);
    }
  }

  protected clearFieldError(field: keyof ValidationState): void {
    const currentValidation = this.validation();

    if (!currentValidation[field]) {
      return;
    }

    this.validation.set({
      ...currentValidation,
      [field]: undefined,
    });
  }

  private getDashboardPath(role: 'admin' | 'employee'): string {
    return role === 'admin' ? '/dashboard/admin' : '/dashboard/employee';
  }
}
