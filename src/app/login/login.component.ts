import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors:any=[];
  constructor(private auth:AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
      });
   }

  ngOnInit() {
  }
  loginPost(){
    this.auth.login(this.loginForm.value)
    
  }

}
