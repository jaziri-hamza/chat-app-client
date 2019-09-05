import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { UnauthenticatedComponent } from './unauthenticated.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { IsAuthGuard } from '../is-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: UnauthenticatedComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
        canActivate: [IsAuthGuard]
      },{
        path: 'login',
        component:LoginComponent,
        pathMatch: 'full',
        canActivate: [IsAuthGuard]
      },{
        path: 'signup',
        pathMatch: 'full',
        component: SignupComponent,
        canActivate: [IsAuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    UnauthenticatedComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UnauthenticatedModule { }
