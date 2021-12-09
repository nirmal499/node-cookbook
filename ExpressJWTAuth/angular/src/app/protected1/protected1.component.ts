import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-protected1",
  template: ` <p>Message: {{ message }}</p> `,
  styles: [],
})
export class Protected1Component implements OnInit {
  message?: String;
  constructor(private http: HttpClient) {}

  // Execute this HTTP request when the route loads
  ngOnInit() {
    /* We are making a GET request to `users/protected` route */
    this.http.get<any>("http://localhost:3000/users/protected1").subscribe(
      (response) => {
        if (response) {
          this.message = response.msg;
        }
      },

      (error) => {
        if (error.status === 401) {
          this.message =
            "You are not authorized to visit this route.  No data is displayed.";
        }

        console.log(error);
      },

      () => {
        console.log("HTTP request done");
      }
    );
  }
}
