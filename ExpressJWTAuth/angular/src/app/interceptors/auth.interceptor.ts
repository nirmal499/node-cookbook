import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  /* It is intercepting every HTTP request that angular is sending out
    and it's going to run the intercept method below implemented
  */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token");

    /* 
      Both for the POST REQUEST to 'users/login' and 'users/register' route

      WE GET IN RESPONSE
      "success": true,
      "token": "Bearer .......",
      "expiresIn": "1d" 
    */
    if (idToken) {
      /* Here we are cloning the REQUEST (req) and then we are setting the Authorization header with the token
        retrieved from the localStorage
      */
      const reqCloned = req.clone({
        headers: req.headers.set("Authorization", idToken),
      });

      /* It is just like middleware in express application
        next method is going to get a new modified cloned REQUEST(req)
      */
      return next.handle(reqCloned);
    } else {
      return next.handle(req);
    }
  }
}
