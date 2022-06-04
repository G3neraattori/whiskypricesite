import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ValidateService } from "./services/validate.service";
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import { JwtModule} from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthGuard} from "./guards/auth.guard";
import { NgChartsModule} from "ng2-charts";

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SearchComponent } from './components/search/search.component';
import { ChartDrawerComponent } from './components/chart-drawer/chart-drawer.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    LineChartComponent,
    SearchComponent,
    ChartDrawerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [ValidateService, AuthService, JwtHelperService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter(){
  return localStorage.getItem("id_token");
}


