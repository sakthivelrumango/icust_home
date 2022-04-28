import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check();
  }

  private _check(): Observable<boolean>
  {
      // Check the authentication status
      return this.jwtAuth.check()
                 .pipe(
                     switchMap((authenticated) => {
      console.log("check status",authenticated);
                         // If the user is not authenticated...
                         if ( !authenticated )
                         {
                             // Redirect to the sign-in page
                             this.router.navigate(["/sessions/signin"]);

                             // Prevent the access
                             return of(false);
                         }

                         // Allow the access
                         return of(true);
                     })
                 );
  }
}
