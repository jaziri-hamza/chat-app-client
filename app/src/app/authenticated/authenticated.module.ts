import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessagesModule } from './messages/messages.module';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [

  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'messages'
      },
      {
        path: 'messages',
        loadChildren: './messages/messages.module#MessagesModule'
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  }

];


@NgModule({
  declarations: [AuthenticatedComponent, NavbarComponent, SettingComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticatedModule { }
