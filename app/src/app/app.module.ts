import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthenticatedModule } from './unauthenticated/unauthenticated.module';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { MessagesModule } from './authenticated/messages/messages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnauthenticatedModule,
    AuthenticatedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
