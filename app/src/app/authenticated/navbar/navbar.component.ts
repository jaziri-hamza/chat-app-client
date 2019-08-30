import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  get isMessagePath(){
    return this.route.url.match('messages') !== null;
  }

  get isSettingPath(){
    return this.route.url.match('setting') !== null;
  }


  logout(){
    console.log('logout');
  }
  


}
