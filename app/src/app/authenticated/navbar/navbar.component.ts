import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { MessageService } from '../messages/body-message/message.service';
import { ChatService } from '../messages/left-side-bar/chat/chat.service';
import { ContactService } from '../messages/left-side-bar/contact/contact.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthenticatedService,
    private msgService: MessageService,
    private chatService: ChatService,
    private contactService: ContactService,

    ) { }

  ngOnInit() {
  }

  get isMessagePath(){
    return this.route.url.match('messages') !== null;
  }

  get isSettingPath(){
    return this.route.url.match('setting') !== null;
  }


  logout(){
    this.msgService.clear();
    this.chatService.clear();
    this.contactService.clear();
    this.authService.logout();
  }
  


}
