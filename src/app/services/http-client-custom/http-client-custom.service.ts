// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpClientCustomService {

//   constructor() { }
// }



import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';
const API_URL = environment.apiBase;
@Injectable({
  providedIn: 'root'
})
export class HttpClientCustomService {
  headers:any;
  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders();
    // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    // this.headers = this.headers.set('Content-Type', 'multipart/form-data');
    // 'Content-Type': 'application/json',
    // this.headers = this.headers.set('Accept', 'application/json; charset=utf-8');
    // this.headers = this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // this.headers = this.headers.set('Content-Type', 'multipart/form-data');
    // this.headers = this.headers.set('Content-Type', 'multipart/form-data');
    
    const currentAuth = JSON.parse(localStorage.getItem('currentAuth'));
    if(currentAuth && currentAuth.access_token)
    {
      this.headers = this.headers.set('Authorization', 'Bearer '+currentAuth.access_token);
    }
  }

  get(url) {
    return this.http.get(API_URL+url, {headers:this.headers});
  }

  post(url, data) {
    return this.http.post(API_URL+url, data, {headers: this.headers});
  }
  put(url, data) {
    return this.http.put(API_URL+url, data, {headers: this.headers});
  }
  delete(url){
    return this.http.delete(API_URL+url,{headers: this.headers});
  }
  checkError(error){
      if(error.status === 401){
        //invalid token
        // remove user from local storage to log user out
        localStorage.removeItem('currentAuth');
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
      }
      else if(error.status === 400){
          //alert("validation error");
      }
      else if(error.status === 500){
        if(error.hasOwnProperty('error')){
          if(error.error.hasOwnProperty('message')){
            var message = error.error.message; 
            var res = message.match(/Cannot delete some instances of model/g);
            console.log(message)
            if(res){
              if(res.length > 0){
                alert("Remove all dependency corresponding to this")
              }
            }else if(message == "Authentication credentials were not provided."){
              localStorage.removeItem('currentAuth');
              localStorage.removeItem('currentUser');
              this.router.navigateByUrl('/login');
            }
            else{
              alert(message)
            }
            
          }
        }
        
    }
      else{
        console.log(error)
          // alert("error");
      }
  }

}
