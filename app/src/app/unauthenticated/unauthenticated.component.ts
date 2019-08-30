import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-unauthenticated',
  templateUrl: './unauthenticated.component.html',
  // animations: [  ],
  styleUrls: ['./unauthenticated.component.scss']
})
export class UnauthenticatedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }

}
