import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import Auth = firebase.auth.Auth;
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user!: User;

  constructor(public authF: AngularFireAuth) { }

  async login(email: string, password: string){
    try {
      const result = await this.authF.signInWithEmailAndPassword(email,password);
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async register(email: string, password: string){
    try {
      const result = await this.authF.createUserWithEmailAndPassword(email,password);
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async logout(){
    try {
      await this.authF.signOut();
    } catch (error) {
      console.log(error);
    }
  }

}
