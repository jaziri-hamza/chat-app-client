import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/Api';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { ChatService } from '../left-side-bar/chat/chat.service';
import { UpdatechatService } from '../left-side-bar/chat/updatechat.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  private _currentUserId: string;
  private _currentUserName: string;
  private _messages : Message[] = [];

  
  constructor(
    private http: HttpClient,
    private authService: AuthenticatedService,
    // private updateChatService: UpdatechatService,
  ) { }


  get messages(){ return this._messages;}
  get currentUserName(){ return this._currentUserName;}

  initMessage(id: string, name: string){
    this._messages = [];
    if(id == null) return;
    this.http.get<any>(Api.entryPoint+'messages/'+id, Api.httpOptions)
    .toPromise().then( res=>{
      this._currentUserId  = id;
      this._currentUserName = name;
      if(res==null) return;
      this._messages = this._messages.concat(res.msg);
    }).catch(err=>{
      console.log(err);
    })
  }

  /**
   * 
   *  msg: [
    {
      body: string,
      createdAt: Date,
      _id: {
        _id: string,
        firstName: string,
        lastName: string
      }
    }
  ];
  users: [
    {
      _id: string,
      firstName: string,
      lastName: string
    }
  ];
   */

  async sendMessage(body){
    return await this.http.post(Api.entryPoint+'messages/'+this._currentUserId, body, Api.httpOptions)
    .toPromise().then(res=>{
      let chatMessage = {
        status: 1,
        result: {
        msg: [{
          body: body.body,
          createdAt: new Date(),
          _id: {
            _id: this.authService.user.id,
            firstName: this.authService.user.firstName,
            lastName: this.authService.user.lastName
          }
        }],
        users: [
          {
            _id: this._currentUserId,
            firstName: this._currentUserName.split(' ')[0],
            lastName: this._currentUserName.split(' ')[1]
          }
        ]}
      };
      if(this._messages.length == 0){
        chatMessage.status = 1;
      }else{
        chatMessage.status  = 0;
      }
      
      this._messages = this._messages.concat(this.creatMessageObject(body.body));
      console.log(this._messages);
      return chatMessage;
    }).catch(err=>{
      console.log(err);
    });
  }



  clear(){
    this._messages = [];
    this._currentUserId = null;
  }


  creatMessageObject(body: string){
    const user = this.authService.user;
    let msg : Message = {
      body: body,
      _id: {
        firstName: user.firstName,
        lastName:user.lastName,
        _id: user.id
      },
      createdAt: new Date()
    };
    return msg;
  }


}


class Message{
  body: string;
  _id: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  createdAt: Date;
}
