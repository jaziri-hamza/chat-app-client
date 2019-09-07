import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedService } from 'src/app/authenticated.service';


import { Api } from '../../../../Api';
import { MessageService } from '../../body-message/message.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {


  private dataLoaded: boolean = false;
  private _page: number;
  private _chats: ChatModel[] = [];

  get page(){ return this._page || 1; }
  get chats(){ return this._chats || [];}

  constructor(
    private http: HttpClient,
    private authService: AuthenticatedService,
    private msgService: MessageService,
    

  ) { }



  loadChat(){
    if(this.dataLoaded) return;
    this.http.get<ChatModel>(Api.entryPoint+'messages', Api.httpOptions).toPromise()
    .then( res => {
      this._chats = this._chats.concat(res);
      this.dataLoaded = true;
      this.msgService.initMessage(this.chats[0].users[0]._id, this.chats[0].users[0].firstName+' '+ this.chats[0].users[0].lastName);
    }).catch( err => {
      console.log(err);
    })
  }

  update(obj){
    if(obj.status == 1){
      this._chats.unshift(obj.result);
    }else{
      //another
      const indexEle = this._chats.findIndex(ele=> { return ele.users[0]._id == obj.result.users[0]._id });
      this._chats[indexEle] = obj.result;
    }
    console.log(obj);
  }

  clear(){
    this._chats = [];
    this._page = null;
    this.dataLoaded = false;
  }

}



class ChatModel{

  msg: [
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

}
