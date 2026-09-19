import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/auth/auth.guards';
import { LoginPageComponent } from './features/login/pages/login-page.component';
import { MockDashboardPageComponent } from './features/login/pages/mock-dashboard-page.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login',
	},
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'dashboard/admin',
		component: MockDashboardPageComponent,
		canActivate: [authGuard, roleGuard],
		data: {
			heading: 'Admin dashboard',
			role: 'admin',
			summary: 'Review clinic activity, team status, and high-priority actions.',
		},
	},
	{
		path: 'dashboard/employee',
		component: MockDashboardPageComponent,
		canActivate: [authGuard, roleGuard],
		data: {
			heading: 'Employee dashboard',
			role: 'employee',
			summary: 'Track appointments, treatment prep, and front-desk follow-ups.',
		},
	},
	{
		path: '**',
		redirectTo: 'login',
	},
];
