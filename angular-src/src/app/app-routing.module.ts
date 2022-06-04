import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

//Modules
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LineChartComponent} from "./components/line-chart/line-chart.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent , canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'search', component: LineChartComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
