import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <h2>Login</h2>

    <form (ngSubmit)="onLoginSubmit()" #loginform="ngForm">
      <div>
        <p>Enter a username</p>
        <input type="text" name="username" ngModel />
        <p>Enter a password</p>
        <input type="password" name="password" ngModel />
      </div>
      <button style="margin-top: 20px;" type="submit">Register</button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  @ViewChild("loginform", { static: false }) loginForm!: NgForm;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  /* 
    POST JSON BODY
    {
      "username":"zachjwtfake",
      "password":"1fake23"
    }
    WE GET IN RESPONSE
    "success": true,
    "token": "Bearer .......",
    "expiresIn": "1d" */

  onLoginSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const headers = new HttpHeaders({ "Content-type": "application/json" });

    /* 
      POST REQUEST JSON BODY FOR `users/login` route is
      {
        "username":"zachjwt",
        "password":"123"
      } 

    */
    const reqObject = {
      username: username,
      password: password,
    };

    /* We are making post request to '/users/login' route in our express server */
    this.http
      .post("http://localhost:3000/users/login", reqObject, {
        headers: headers,
      })
      .subscribe(
        // The response data
        (response) => {
          // If the user authenticates successfully, we need to store the JWT returned in localStorage
          this.authService.setLocalStorage(response);
        },

        // If there is an error
        (error) => {
          console.log(error);
        },

        // When observable completes
        () => {
          console.log("done!");
          this.router.navigate(["protected2"]);
        }
      );
  }

  ngOnInit(): void {}
}
