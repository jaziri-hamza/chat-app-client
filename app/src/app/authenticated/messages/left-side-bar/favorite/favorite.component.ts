import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { MessageService } from '../../body-message/message.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteService: FavoriteService;

  constructor(
    private messageService: MessageService,
    favoriteService: FavoriteService
  ) {
    this.favoriteService = favoriteService;
  }

  ngOnInit() {
    this.favoriteService.loadFavorite();
  }


  loadMessageBody(id:string){
    this.messageService.initMessage(id);
  }
  


}
