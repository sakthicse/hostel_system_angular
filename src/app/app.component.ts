import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { DataTransService } from './services/data-trans.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentAuth:any;
  currentUser:any;
  title = 'crawle-angular';
  constructor(private auth:AuthService, private router: Router,public datatr:DataTransService) {
    this.currentAuth = this.auth.token();
    if(!this.currentAuth){
      this.datatr.getRecentAppConfigList().subscribe(data=>{
        this.currentAuth = data;
      })
    }
   
    if(!this.currentAuth){
      this.router.navigateByUrl('/login');
  }

  }
  logout(){
    this.auth.logout();
    this.currentAuth = this.auth.token();
    this.router.navigateByUrl('/login');
    // window.location.href  = API_URL+"/accounts/logout/?next=/logout-redirect?redirect_url="+site_url;
  }
}
