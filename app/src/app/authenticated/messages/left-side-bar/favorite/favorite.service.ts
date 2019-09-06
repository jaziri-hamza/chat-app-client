import { Injectable } from '@angular/core';
import { AuthenticatedService } from 'src/app/authenticated.service';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/Api';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


  private dataLoaded: boolean = false;
  private _favorites: FavoriteModel[] = [];

  constructor(
    private authService: AuthenticatedService,
    private http: HttpClient
  ) { }

  get favorites(){ return this._favorites; }

  loadFavorite(){
    if(this.dataLoaded) return;
    this.http.get<any>(Api.entryPoint+'favorites', Api.httpOptions)
    .toPromise().then( res => {
      let result = (({favorite})=>({favorite}))(res);
      this._favorites = this._favorites.concat(result.favorite);
      this.dataLoaded = true;
      console.log(this._favorites);
    }).catch( err => {
      console.log(err);
    });
  }

  postFavorite(id: string){
    this.http.post<any>(Api.entryPoint+'favorites/'+id, {}, Api.httpOptions)
    .toPromise().then( res => {
      let result = <any> (({favorite}) => ({favorite}))(res);
      if(res.status == 201){
        this._favorites.push(result.favorite);
      }else if(res.status == 202){
          const filtredArray = this._favorites.filter((element)=>{
            return element._id != result.favorite._id;
          });
          this._favorites = filtredArray;
      }
    }).catch( err => {
      console.log(err);
    });
  }

}

class FavoriteModel{
  firstName: string;
  lastName: string;
  _id: string;
}
