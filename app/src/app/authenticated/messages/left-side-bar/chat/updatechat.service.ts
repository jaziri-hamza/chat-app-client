import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatechatService {

  constructor(
    private chatService: ChatService
  ) { }


  updateChatService(obj){
    this.chatService.update(obj);
  }

}
