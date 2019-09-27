import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { YearComponent } from './year/year.component';

const routes: Routes = [
 	 {
        path: "",
        component: HomeComponent
      },
      {
        path: "login",
        component: LoginComponent
    },
     {
        path: "home",
        component: HomeComponent
    },{
      path:'year',
      component:YearComponent
    }
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
