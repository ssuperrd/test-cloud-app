import '@angular/compiler';

import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../../core/auth/auth.service';

describe('LoginPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [AuthService, provideRouter([])],
    }).compileComponents();
  });

  it('renders the login form and placeholder secondary links', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="username"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="password"]')).toBeTruthy();
    expect(compiled.textContent).toContain('Forgot password?');
    expect(compiled.textContent).toContain("Don't have an account? Sign up");
  });

  it('shows validation feedback when the user submits empty credentials', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    await component.submit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Username is required.');
    expect(compiled.textContent).toContain('Password is required.');
  });

  it('navigates admins to /dashboard/admin after a successful login', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    const router = TestBed.inject(Router);
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.username.set('admin');
    fixture.componentInstance.password.set('Password123!');

    await fixture.componentInstance.submit();

    expect(navigateByUrl).toHaveBeenCalledWith('/dashboard/admin');
  });

  it('keeps the placeholder links non-navigating in this baseline', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('[data-placeholder-link="true"]'));

    expect(links).toHaveLength(2);
    expect(links.every((element) => !element.getAttribute('href'))).toBe(true);
  });
});
