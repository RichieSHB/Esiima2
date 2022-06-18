import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

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

  usuarioActivo(){
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const email = user.email;
      
      return email;
    }
    return;
  }

  isLogged(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user?.email !== undefined) {
      console.log("true en authSertvice" + user?.email);
      return true;
    }else{
      console.log("false en authSertvice" + user?.email);
      return false;
    }
  }
}
