import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { AuthSMSService } from '../services/authSMS/auth-sms.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public auth = getAuth();
  
  windowRef: any;
  phoneNumber: string | undefined;
  
  loginForm =  new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });
  
  phoneForm =  new FormGroup({
    number: new FormControl(""),
    code: new FormControl("")
  });

  

  constructor(private authSvc: AuthService,private AuthSvcSms: AuthSMSService, private router:Router) {

  }
   

  ngOnInit(): void {
    setTimeout(()=>{
      this.generateCaptcha();     
    },200)
  }

  generateCaptcha(){
    window.recaptchaVerifier= new firebase.auth.RecaptchaVerifier('recaptcha-container');
    window.recaptchaVerifier.render();
  }  

  code(numero:string){
    this.AuthSvcSms.sendCode(numero,window.recaptchaVerifier);
  }
  codeVerify(codigo:string){
    this.AuthSvcSms.verifyCode(codigo);
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email,password);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}
