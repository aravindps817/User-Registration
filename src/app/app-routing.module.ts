import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouterComponent } from './common/app-router/app-router.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  { path: 'user-registration', component: AppRouterComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { preload: true }},
    ]
  },
  { path: 'signIn', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  data: { preload: true }},
  { path: 'logout', component: LogoutComponent},
  { path: '**', redirectTo: 'user-registration/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
