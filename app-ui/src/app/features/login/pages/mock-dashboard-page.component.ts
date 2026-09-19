import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-mock-dashboard-page',
  template: `
    <section class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-5xl flex-col justify-center gap-6 rounded-[2rem] border border-white/60 bg-white/78 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-3">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Protected route</p>
            <h1 class="font-[Georgia] text-4xl leading-none text-slate-900">{{ heading() }}</h1>
            <p class="max-w-2xl text-base leading-7 text-slate-700">{{ summary() }}</p>
          </div>

          <button
            type="button"
            class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            (click)="logout()"
          >
            Sign out
          </button>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <article class="rounded-3xl border border-orange-100 bg-orange-50/80 p-5">
            <p class="text-sm font-semibold text-slate-900">Active role</p>
            <p class="mt-2 text-2xl font-semibold capitalize text-orange-600">{{ currentRole() }}</p>
          </article>
          <article class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-900">Mock boundary</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">Session state, guards, and token attachment are local placeholders only.</p>
          </article>
          <article class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-900">Next step</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">Replace the local auth boundary with a real provider when the architecture is finalized.</p>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class MockDashboardPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly heading = computed(() => (this.routeData()['heading'] as string | undefined) ?? 'Dashboard');
  readonly summary = computed(() =>
    (this.routeData()['summary'] as string | undefined) ?? 'Protected dashboard placeholder.',
  );
  readonly currentRole = computed(() => this.authService.currentUser()?.role ?? 'guest');

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}