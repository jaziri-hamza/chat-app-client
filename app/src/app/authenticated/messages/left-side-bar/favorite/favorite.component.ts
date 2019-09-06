import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteService: FavoriteService;

  constructor(
    favoriteService: FavoriteService
  ) {
    this.favoriteService = favoriteService;
  }

  ngOnInit() {
    this.favoriteService.loadFavorite();
  }


  


}
