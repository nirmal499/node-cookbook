import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  /* 
    Both for the POST REQUEST to 'users/login' and 'users/register' route

    WE GET IN RESPONSE
    "success": true,
    "token": "Bearer .......",
    "expiresIn": "1d" */

  setLocalStorage(responseObj: any) {
    if (responseObj.success) {
      const expires = moment().add(responseObj.expiresIn);

      localStorage.setItem("token", responseObj.token);
      localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }

  isLoggedIn() {
    /* Here we check if current time is before or after the specified expiration time of token */
    return moment().isBefore(this.getExpiration());
    /* If it returns true that means the jwt is still valid */
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires");
    if (!expiration) {
      /* expiration is null */
      return;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
