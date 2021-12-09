import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Protected1Component } from "./protected1/protected1.component";
import { Protected2Component } from "./protected2/protected2.component";
import { FormsModule } from "@angular/forms";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthService } from "./services/auth.service";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "protected1", component: Protected1Component },
  { path: "protected2", component: Protected2Component },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Protected1Component,
    Protected2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    /* We have to implement the useHash option becoz we have our api from our express application
      and then we the routes from the angular application, we don't want them to conflict
    */
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
