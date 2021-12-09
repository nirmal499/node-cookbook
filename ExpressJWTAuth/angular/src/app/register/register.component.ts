import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  template: `
    <h2>Register</h2>

    <form (ngSubmit)="onRegisterSubmit()" #registerform="ngForm">
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
export class RegisterComponent implements OnInit {
  @ViewChild("registerform", { static: false }) registerForm!: NgForm;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  // Submits a post request to the /users/register route of our Express app
  onRegisterSubmit() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    const headers = new HttpHeaders({ "Content-type": "application/json" });

    /* 
    POST REQUEST JSON BODY FOR `users/register` route is
    {
      "uname":"zachjwt",
      "pw":"3"
    } 
    */
    const reqObject = {
      uname: username,
      pw: password,
    };

    /* We make a post request to 'users/register' route in our express server */
    this.http
      .post("http://localhost:3000/users/register", reqObject, {
        headers: headers,
      })
      .subscribe(
        // The response data
        (response) => {
          this.authService.setLocalStorage(response);
          console.log(response);
        },

        // If there is an error
        (error) => {
          console.log(error);
        },

        // When observable completes
        () => {
          console.log("done!");
          this.router.navigate(["protected1"]);
        }
      );
  }
}
