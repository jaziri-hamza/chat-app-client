import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatService: ChatService;

  constructor(
    chatService: ChatService
  ) {
    this.chatService = chatService;
  }

  ngOnInit() {
    this.chatService.loadChat();
  }


}

