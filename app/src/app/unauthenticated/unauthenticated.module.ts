import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';


import { UnauthenticatedComponent } from './unauthenticated.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from '../notfound/notfound.component';


const routes: Routes = [
  {
    path: '',
    component: UnauthenticatedComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
      },{
        path: 'login',
        component:LoginComponent,
        pathMatch: 'full',
      },{
        path: 'signup',
        pathMatch: 'full',
        component: SignupComponent,
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
    // BrowserAnimationsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UnauthenticatedModule { }
