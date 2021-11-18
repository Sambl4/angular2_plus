import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent, MessagesComponent, LoginComponent, PageNotFoundComponent } from './components';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
  }, {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'popup'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PageNotFoundComponent
  }
];

export let appRouterComponents = [AboutComponent, LoginComponent, PageNotFoundComponent];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
