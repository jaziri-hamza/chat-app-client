import { Component, OnInit } from '@angular/core';
import { SocketIOService } from './socket.io.service';
import { ChatService } from './messages/left-side-bar/chat/chat.service';
import { MessageService } from './messages/body-message/message.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  private data: any;

  constructor(
    // private socketService: SocketIOService
    private socketIO: SocketIOService,
    private chatService: ChatService,
    private MessageService: MessageService,
  ) {
    
    this.socketIO.pullMsg().subscribe((data)=>{
      if(data!=this.data){
        console.log('times')
      this.chatService.updateSocket(data);
      this.MessageService.pushMessageObject(data.msg[0].body, data.users[0]);
      this.data = data;
      }
    });
    
    // this.socketIO.pullMsgData
  }

  ngOnInit() {
  }



}
