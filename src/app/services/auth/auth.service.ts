import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClientCustomService } from '../http-client-custom/http-client-custom.service';
// import { currentId } from 'async_hooks';

const API_URL = environment.apiBase;
// const client_id = environment.client_id;
// const client_secret = environment.client_secret;
// const redirect_uri = environment.redirect_uri;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: Http, private router: Router,public cus_http : HttpClientCustomService) { }


  login(data){
    // api-token-auth/
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.cus_http.post("/api-token-auth/", data).subscribe((data) => {


      console.log("*********************");
      console.log(data['token']);
      var currentAuth={"access_token":data['token']}
                //  localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('currentAuth', JSON.stringify(currentAuth));
      return  JSON.stringify(currentAuth)
     

      // this.router.navigateByUrl('/home');
    }, (err)=>{
          this.router.navigateByUrl('/login');
          console.log(err);
          });
  }
    authorizeuser() {
      // window.location.href = API_URL+"/oauth/authorize?client_id="+client_id+"&response_type=code&redirect_uri="+redirect_uri;
    }
    getAccessToken(code) {
        // if(code){
        //     var headers = new Headers();
        //     headers.append('Content-Type', 'application/json');
        //     var tokendata = {
        //     code:code,
        //     client_id:client_id,
        //     client_secret:client_secret,
        //     grant_type:"authorization_code",
        //     redirect_uri:redirect_uri
        //     };
        //      this.http.post(API_URL+"/oauth/token/", tokendata, {headers: headers}).subscribe((data) => {
        //        var response = data.json();
        //        //get the user information
        //        //localStorage.setItem('currentAuth', JSON.stringify(response));
        //        var empheaders = new Headers();
        //        empheaders.append('Content-Type', 'application/json');
        //        empheaders.append('Authorization', 'Bearer '+response.access_token);
        //        this.http.get(API_URL+"/user/userinfo/",{headers: empheaders}).subscribe((userdata) => {
        //            localStorage.setItem('currentUser', JSON.stringify(userdata.json()));
        //            localStorage.setItem('currentAuth', JSON.stringify(response));
        //            //this.router.navigateByUrl('/home');
        //           //  window.location.href = '/home';
        //            window.location.href = "/choose-organization"
        //        },(emperr)=>{
        //        this.router.navigateByUrl('/forbidden');
        //        console.log(emperr);
        //         });
        //        //this.router.navigateByUrl('/home');
        //     }, (err)=>{
        //     this.router.navigateByUrl('/forbidden');
        //     console.log(err);
        //     });
        // }
        // else{
        //     this.router.navigateByUrl('/forbidden');
        // }
    }
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentAuth');
      localStorage.removeItem('currentUser');
      
    }
    token() {
      const token = JSON.parse(localStorage.getItem('currentAuth'));
      if(token)
      {
        return true;
      }else{
        return false;
      }
    }
    user() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if(user)
      {
        if(!user.user_profile){
          user.user_profile={"is_superuser":false};
        }
        return user;
      }else{
        return false;
      }
    }
    updateUserInfo(name,organization_id){
      const user = JSON.parse(localStorage.getItem('currentUser'));
      user.organization = organization_id;
      user.organization_name = name;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    getOrganization(){
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if(user){
        if(user.hasOwnProperty('organization')){
        return user.organization;
      }else{
        return '';
      }
      }
    }
    getOrganizationName(){
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if(user){
        if(user.hasOwnProperty('organization_name')){
        return user.organization_name;
      }else{
        return '';
      }
      }
    }

}
