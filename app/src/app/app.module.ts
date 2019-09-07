import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthenticatedModule } from './unauthenticated/unauthenticated.module';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { HttpClientModule } from '@angular/common/http';


import {  SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: { data: '123456789' }};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnauthenticatedModule,
    AuthenticatedModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
