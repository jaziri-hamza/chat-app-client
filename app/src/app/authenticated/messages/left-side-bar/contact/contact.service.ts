import { Injectable } from '@angular/core';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { HttpClient } from '@angular/common/http';

import { Api } from '../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private _contacts: ContactModel[] = [];

  constructor(
    private authService: AuthenticatedService,
    private http: HttpClient
  ) { }

  get contacts(){ return this._contacts;}


  loadContact(){
    this.http.get<ContactModel>(Api.entryPoint+'users', Api.httpOptions).toPromise()
    .then( res => {
      this._contacts.push(res);
      console.log(this.contacts);
    }).catch( err => {
      console.log(err);
    });
  }



}

class ContactModel{
  contact: [{
    firstName: string;
    lastName: string;
    _id: string;
  }]
}
