import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/Api';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { ChatService } from '../left-side-bar/chat/chat.service';
import { UpdatechatService } from '../left-side-bar/chat/updatechat.service';
import { Socket } from 'ngx-socket-io';
import { SocketIOService } from '../../socket.io.service';

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
    private socketIO: SocketIOService,
    // private socket: Socket
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
    // this.socket.emit('user-data', body);
    let socketData  = {
      user: this._currentUserId,
      msg: body
    };
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
      this.socketIO.pushMsg({
        msg : {
          body: body.body,
          createdAt: new Date(),
        },
        user : {
          sendToId: this._currentUserId,
          sendById: this.authService.user.id
        }
      });
      
      this._messages = this._messages.concat(this.creatMessageObject(body.body, null));
      // send socketio

      return chatMessage;
    }).catch(err=>{
      console.log(err);
    });
  }



  clear(){
    this._messages = [];
    this._currentUserId = null;
  }


  pushMessageObject(body: string, dataUser: any){
    console.log(this._currentUserId);
    console.log(dataUser._id);
    if(this._currentUserId != dataUser._id) return;
    this._messages = this._messages.concat(this.creatMessageObject(body, dataUser));
  }


  creatMessageObject(body: string, dataUser:any){
    if(dataUser==null){
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
    }else{
      let msg : Message = {
        body: body,
        _id: {
          firstName: dataUser.firstName,
          lastName:dataUser.lastName,
          _id: dataUser._id
        },
        createdAt: new Date()
      };
      return msg;
    }
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
