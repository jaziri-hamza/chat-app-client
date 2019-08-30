import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Route, UrlSegment, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements  CanLoad {
  canLoad(route: Route, segments: UrlSegment[]):  boolean{
      return false;
  }
}
