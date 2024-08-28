import { inject, Injectable } from "@angular/core";
import { Auth, confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FirebaseError } from "firebase/app";



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);
  errorCode: string | null = null;

  constructor() {}

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigateByUrl('board');
    } catch (err: any) {
      console.error(err);
      this.errorCode = err.code;
      throw err;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      window.open('login', '_self');
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async sendPasswordResetMail(mail: string): Promise<void> {
    try {
      const actionCodeSettings = { url: 'https://dabubble.tobias-roeske.ch/resetpassword' };
      await sendPasswordResetEmail(this.auth, mail, actionCodeSettings);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async guestLogin(): Promise<void> {
    // try {
    //   const userCredential = await signInWithEmailAndPassword(this.auth, 'guest@guest.de', '12345678');
    //   await this.updateUserProfile({ photoURL: 'assets/img/profile_big.png' });
    //   this.updateLoggedInUser(userCredential.user);
    //   this.router.navigateByUrl('board');
    // } catch (err: any) {
    //   console.error(err);
    //   this.errorCode = err.code;
    //   throw err;
    // }
  }

  async resetPassword(code: string, password: string): Promise<void> {
    try {
      await confirmPasswordReset(this.auth, code, password);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}
