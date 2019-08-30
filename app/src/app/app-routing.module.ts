import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './is-auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: './unauthenticated/unauthenticated.module#UnauthenticatedModule'
  // },
  {
    path: '',
    loadChildren: './authenticated/authenticated.module#AuthenticatedModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

