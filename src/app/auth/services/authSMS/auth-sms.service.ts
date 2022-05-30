import { Injectable } from '@angular/core';
import{ AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

declare global{
  interface Window{
    res:any;
    recaptchaVerifier:firebase.auth.RecaptchaVerifier;
    grecaptcha:any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthSMSService {

  constructor(private autenticacion: AngularFireAuth) { }

  sendCode(numero:string, appVerified:any){
    return this.autenticacion.signInWithPhoneNumber(numero,appVerified).then(confirmation=>{
      window.res=confirmation;
    }).catch(err=>{
      console.log(err);
    });

  }
  verifyCode(codigo:string){
    return window.res.confirm(codigo).then((result:any)=>{
      let credenciales = firebase.auth.PhoneAuthProvider.credential(window.res.verificationId,codigo);
      this.autenticacion.signInWithCredential(credenciales);
    })
  }
}
