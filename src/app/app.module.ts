import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {CookieService} from 'ngx-cookie-service';
import {LoginService} from './Login/login.service';
import {AuthService} from './Login/auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { NavComponent } from './Nav/nav/nav.component';
import { RegComponent } from './Reg/reg/reg.component';
import { PostsComponent } from './Posts/posts/posts.component';
import { HomeComponent } from './Home/home/home.component';
import { CPostComponent } from './CPost/cpost/cpost.component';
import { PostDetialComponent } from './Posts/post-detial/post-detial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RegComponent,
    PostsComponent,
    HomeComponent,
    CPostComponent,
    PostDetialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:"home",component:HomeComponent,canActivate:[AuthService]},
      { path:'posts',component:PostsComponent,canActivate:[AuthService]},
      { path:"registration",component:RegComponent },
      { path:"createpost",component:CPostComponent ,canActivate:[AuthService]},
      { path:"login",component:LoginComponent },
      { path:"detial/:id",component:PostDetialComponent ,canActivate:[AuthService]},
      { path:"",redirectTo:"home",pathMatch:"full"  },
      { path:"**",redirectTo:"home" }
    ]),
  ],
  providers: [CookieService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
