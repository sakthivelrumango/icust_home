import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtAuth: JwtAuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();
    var changedReq;
    /*  SGIFPCapture : 
     is for biometric url checking, 
     no need to append our bearer token */
    if (token && req.url.indexOf('SGIFPCapture') == -1 && req.url.indexOf('SGIMatchScore') == -1) {

      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });

    } else {
      changedReq = req;
    }

    return next.handle(changedReq);
  }
}
