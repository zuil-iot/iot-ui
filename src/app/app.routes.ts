import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from './services/guard.service';

// Global pages
import { HomeComponent }		from './pages/home/home.component';
// User pages
import { DeviceListComponent }		from './pages/user/device-list/device-list.component';
import { DeviceDetailComponent }	from './pages/user/device-detail/device-detail.component';
// Admin Pages
import { DeviceRegComponent }		from './pages/admin/device-reg/device-reg.component';
// SuperAdmin Pages

const routes: Routes = [
	// Root
	{ path: '', component: HomeComponent},
	// User pages
	{ path: 'pages/user/device-list', component: DeviceListComponent, canActivate: [CanActivateGuard] },
	{ path: 'pages/user/device-detail/:id', component: DeviceDetailComponent, canActivate: [CanActivateGuard] },
	// Admin Pages
	{ path: 'pages/admin/device-reg', component: DeviceRegComponent, canActivate: [CanActivateGuard] },
	// SuperAdmin Pages
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
