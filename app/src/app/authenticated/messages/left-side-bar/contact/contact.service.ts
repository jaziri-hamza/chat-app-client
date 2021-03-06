import { Injectable } from '@angular/core';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { HttpClient } from '@angular/common/http';

import { Api } from '../../../../Api';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dataLoaded: boolean = false;
  private _contacts: ContactModel[] = [];

  constructor(
    private authService: AuthenticatedService,
    private favoriteService: FavoriteService,
    private http: HttpClient
  ) { }

  get contacts(){ return this._contacts;}


  loadContact(){
    if(this.dataLoaded) return;
    this.http.get<ContactModel>(Api.entryPoint+'users', Api.httpOptions).toPromise()
    .then( res => {
      this._contacts = (this._contacts.concat(res));
      this.dataLoaded = true;
      console.log(this.contacts);
    }).catch( err => {
      console.log(err);
    });
  }


  addToFavorite(id: string, index: number){
    this.favoriteService.postFavorite(id, index);
    this._contacts[index].favorite = !this._contacts[index].favorite;
  }



  clear(){
    this._contacts = [];
    this.dataLoaded = false;
  }

 



}

class ContactModel{
    firstName: string;
    lastName: string;
    _id: string;
    favorite: boolean;
}
