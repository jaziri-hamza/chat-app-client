import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Route, UrlSegment, RouterOutlet, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedService } from './authenticated.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements  CanActivate {

  constructor(
    private authService: AuthenticatedService,
    private route: Router
  ){  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean{
    
    if(this.authService.isLogged && route.url.toString() == ''){
      this.route.navigateByUrl('/messages');
      return false;
    }

    if(!this.authService.isLogged && route.url.toString() == 'messages'){
      this.route.navigateByUrl('');
      return false;
    }

    return true;  
  }

}
