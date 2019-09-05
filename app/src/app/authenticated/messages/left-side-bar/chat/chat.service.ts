import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedService } from 'src/app/authenticated.service';


import { Api } from '../../../../Api';

@Injectable({
  providedIn: 'root'
})

export class ChatService {


  private _page: number;
  private _chats: ChatModel[] = [];

  get page(){ return this._page || 1; }
  get chats(){ return this._chats || [];}

  constructor(
    private http: HttpClient,
    private authService: AuthenticatedService
  ) { }



  loadChat(){
    this.http.get<ChatModel>(Api.entryPoint+'messages', Api.httpOptions).toPromise()
    .then( res => {
      this._chats.push(res);
      console.log(this.chats);
    }).catch( err => {
      console.log(err);
    })
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
