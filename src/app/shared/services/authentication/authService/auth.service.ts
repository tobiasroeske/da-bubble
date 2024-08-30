import { inject, Injectable, signal } from "@angular/core";
import { Auth, confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user, User as AuthCurrentUser } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserCredential } from "firebase/auth";
import { UserService } from "../../firestore/user-service/user.service";
import { User } from "../../../models/user.model";
import { AuthStateService } from "../auth-state-service/auth-state.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);
  userService = inject(UserService);
  authStateService = inject(AuthStateService);

  errorCode: string | null = null

  async login(email: string, password: string) {
    try {
      let response: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      await this.userService.updateUserLoginState(response.user.uid, 'loggedIn');
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
      if (this.auth.currentUser) {
        await this.userService.updateUserLoginState(this.auth.currentUser.uid, 'loggedOut');
      }
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
