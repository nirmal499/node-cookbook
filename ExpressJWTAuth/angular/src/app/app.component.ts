import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <h1>JWT Authentication</h1>
    <p><a routerLink="/login">Login</a></p>
    <p><a routerLink="/register">Register</a></p>
    <p><a routerLink="/protected1">Visit Protected1 Route</a></p>
    <p><a routerLink="/protected2">Visit Protected2 Route</a></p>
    <hr />
    <p>Selected route displays below:</p>
    <hr />
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "angular";
}
