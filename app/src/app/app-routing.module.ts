import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './is-auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: './unauthenticated/unauthenticated.module#UnauthenticatedModule',
    canActivate: [IsAuthGuard]
  },
  {
    path: 'messages',
    loadChildren: './authenticated/authenticated.module#AuthenticatedModule',
    canActivate: [IsAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

