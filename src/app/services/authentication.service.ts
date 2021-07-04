import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser( value ) {
    return new Promise<any>(( resolve, reject ) => {
      this.afAuth.createUserWithEmailAndPassword( value.email, value.passwrod )
      .then(
        res => resolve( res ),
        err => reject ( err )
      )
    })
  }

  loginUser( value ) {
    return new Promise<any>(( resolve, reject ) => {
      this.afAuth.signInWithEmailAndPassword( value.email, value.passwrod )
      .then(
        res => resolve( res ),
        err => reject ( err )
      )
    })
  }

  logOutUser() {
    return new Promise<void>(( resolve, reject ) => {
      if( this.afAuth.currentUser ) {
        this.afAuth.signOut().then(() => {
          console.log('log out')
          resolve();
        }).catch(( error ) => {
          reject();
        })
      }
    })
  }

  userDetails() {
    return this.afAuth.user;
  }
}
