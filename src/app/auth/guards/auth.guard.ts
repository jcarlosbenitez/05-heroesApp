import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //   if(this.authService.auth.id){
    //     return true
    //   }
    //   console.log('Bloqueado por el AuthService - CanActivate');
    // return false;
    return this.authService.verificaAutenticacion().pipe(
      tap((estarAutenticado) => {
        if (!estarAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.verificaAutenticacion().pipe(
      tap((estarAutenticado) => {
        if (!estarAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    //   if(this.authService.auth.id){
    //     return true
    //   }
    //   console.log('Bloqueado por el AuthService - canLoad');

    // return false;
  }
}
