import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AuthService} from "../Services/auth.service";
import {Roles} from "../Interfaces/roles";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userObs$.pipe(
      take(1),
      map(user => !!(user && (Object.keys(route.data["roles"])
        .filter(role => role in user.roles && user.roles[role as keyof Roles])).length)),
      tap(hasRole => {
        if (!hasRole) {
          alert("Odmowa dostępu: brak odpowiednich uprawnień.");
          this.router.navigate(['/homepage']);
        }
      })
    )
  }
}
