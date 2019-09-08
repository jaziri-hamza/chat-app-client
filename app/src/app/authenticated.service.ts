import { Injectable } from '@angular/core';

import { Api } from './Api'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as jwt from 'jwt-decode';
import { SocketIOService } from './authenticated/socket.io.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {


  private _errorLogin: boolean;
  
  private _token: string;
  private _user: UserDecode;
  private _isLogged: boolean;


  get errorLogin(){ return this._errorLogin || false;}

  get isLogged(){ return this._isLogged || false;}  
  get token(){ return this._token || null;}
  get user(){ return this._user || null; }


  constructor(
    private http: HttpClient,
    private route: Router,
    private socketIO: SocketIOService
  ) { 
    this.initToken();
    this.decodeJWT();
    this.socketIO.authentificated({'id': this.user.id});
  }

  decodeJWT(){
    if(!this.isLogged)
      return;
    try{
      this._user =  jwt(this.token);
    }catch(err){
      console.log(err);
    }
  }

  initToken(){
      this._token = localStorage.getItem('token') || null;
      if(this.token)
        this._isLogged = true;
  }
  
  login(obj: any){
    if(this.isLogged){
      this.route.navigateByUrl('/messages');
      return;
    }
    return this.http.post<any>(Api.entryPoint+'auth', {username: obj.username, password: obj.password}, Api.httpOptions)
    .toPromise().then( res =>{
      this._isLogged = true;
      this._token = res.token;
      localStorage.setItem('token', this.token);
      this.decodeJWT();
      this.socketIO.authentificated({'id': this.user.id});
      // this.socketIO.pullMsg();
      this.route.navigateByUrl('/messages');
    }).catch( err =>{
      this._errorLogin = true;
    });
  }


  logout(){
    this.socketIO.unauthentificated({'id': this.user.id});
    localStorage.removeItem('token');
    this._token = null;
    this._isLogged = null;
    this._user = null;
    this.route.navigateByUrl('');
  }







}

class UserDecode{
  exp: Number;
  firstName: string;
  iat: number;
  id: string;
  lastName: string;
  username: string;
}
