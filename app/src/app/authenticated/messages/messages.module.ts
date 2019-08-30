import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { BodyMessageComponent } from './body-message/body-message.component';
import { ChatComponent } from './left-side-bar/chat/chat.component';
import { ContactComponent } from './left-side-bar/contact/contact.component';
import { FavoriteComponent } from './left-side-bar/favorite/favorite.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chat'
      },{
        path: 'chat',
        component:  ChatComponent
      },{
        path: 'contact',
        component: ContactComponent
      },{
        path: 'favorite',
        component: FavoriteComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    MessagesComponent, 
    LeftSideBarComponent, 
    RightSideBarComponent, 
    BodyMessageComponent, 
    ChatComponent, 
    ContactComponent, 
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesModule { }
