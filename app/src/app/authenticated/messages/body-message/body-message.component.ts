import { Component, OnInit } from '@angular/core';

import {MessageService} from './message.service';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatService } from '../left-side-bar/chat/chat.service';

@Component({
  selector: 'app-body-message',
  templateUrl: './body-message.component.html',
  styleUrls: ['./body-message.component.scss']
})
export class BodyMessageComponent implements OnInit {


  form: FormGroup;

  messageService: MessageService;
  constructor(
    messageService: MessageService,
    private chatService: ChatService,
    private authService: AuthenticatedService,
    private fb: FormBuilder
  ) {
    this.messageService = messageService;
    this.initForm();
  }


  initForm(){
    this.form = this.fb.group({
      body: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    
  }

  async sendMessage(){
    // send the message
    const data = await this.messageService.sendMessage(this.form.value);
    // add message to chat-service
    
    this.chatService.update(data);
  }


  get userId(){ return this.authService.user.id;}

}
