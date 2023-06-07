import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APostGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idCourse = route.queryParamMap.get('idCourse');

    if (idCourse && !isNaN(Number(idCourse))) {
      return true; // autorise l'accès à l'URL
    } else {
      this.router.navigate(['/course']);
      return false; // bloque l'accès à l'URL
    }
  }

}
