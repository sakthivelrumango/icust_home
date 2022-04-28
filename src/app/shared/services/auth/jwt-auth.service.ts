import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError, Observable } from "rxjs";
import { environment } from "environments/environment";

export const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNha3RoaXZlbCBNIiwiaWF0IjoxNTE2MjM5MDIyfQ.bBICv7tbGE5acaOULVhq_q9O50dHiYDnSfQYg3_Av1k";

export const DEMO_USER: any = { 
  "userName": "CHANDRASEKHAR", 
  "userId": 1, 
  "tellerName": "Chandra Sekhar" 
};

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: boolean;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: boolean;
  return: string;
  JWT_TOKEN = "token";
  APP_USER = "ICUST_USER";

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  /**
 * Setter & getter for access token
 */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  public signin() {
    return of({ token: DEMO_TOKEN, user: DEMO_USER })
      .pipe(
        delay(1000),
        map((res: any) => {
          this.setUserAndToken(res.token, res.user, !!res);
          this.signingIn = true;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );

  }


  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    return of(DEMO_USER)
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );

  }

  public signout() {
    this.ls.clear();
    sessionStorage.clear();
    this.signingIn = false;
    this.router.navigate(["/sessions/signin"]);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token?: string, user?: any, isAuthenticated?: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.accessToken = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
    sessionStorage.clear();
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this.accessToken) {
      return of(true);
    } else {
      return of(false);
    }
  }

  encodeData(data: any) {
    return btoa(data);
  }

  decodeData(data: any) {
    console.log("data decr",data);
    let user = atob(data);
    console.log("decr",user);
    return JSON.parse(user);
  }

  getEncryptedToken() {
    let user = this.getUser();
    let encodedUser = this.encodeData(user);
    return encodedUser;
  }
}
