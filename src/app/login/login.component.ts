import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { DataTransService } from '../services/data-trans.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors:any=[];
  constructor(private auth:AuthService,public datatr:DataTransService, private router: Router) {
    // currentAuth 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
      });
   }

  ngOnInit() {
  }
  loginPost(){
    var tok = this.auth.login(this.loginForm.value);
    console.log("***** @@@@")
    console.log(tok);
    if(tok){
      this.datatr.setRecentAppConfigList(tok);
      this.router.navigateByUrl('/home');
    }
   
    
  }

}
