import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { MessageService } from '../../body-message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatService: ChatService;

  constructor(
    chatService: ChatService,
    private messageService: MessageService
  ) {
    this.chatService = chatService;
  }

  ngOnInit() {
    this.chatService.loadChat();
  }


  loadMessageBody(id:string, name: string){
    this.messageService.initMessage(id, name);
  }





}

