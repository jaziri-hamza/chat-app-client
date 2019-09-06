import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/Api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  private _currentUserId: string;
  
  private _messages : Message[] = [];

  
  constructor(
    private http: HttpClient
  ) { }


  get messages(){ return this._messages;}

  initMessage(id: string){
    this._messages = [];
    if(id == null) return;
    this.http.get<any>(Api.entryPoint+'messages/'+id, Api.httpOptions)
    .toPromise().then( res=>{
      this._currentUserId  = id;
      if(res==null) return;
      this._messages = this._messages.concat(res.msg);
      console.log(this._messages);
    }).catch(err=>{
      console.log(err);
    })
  }

  sendMessage(body){
    this.http.post(Api.entryPoint+'messages/'+this._currentUserId, body, Api.httpOptions)
    .toPromise().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
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
