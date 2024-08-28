import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { User } from '../../../models/user.model';
import { UserService } from '../../firestore/user-service/user.service';
import { AuthService } from '../authService/auth.service';

type UserForRegistration = {
  name: string,
  email: string,
  password: string, 
  avatarPath: string,
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  auth = inject(Auth);
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);
  errorCode: string | null = null;
  signUpSuccessful: boolean = false;
  newUserSignal = signal<UserForRegistration>({
    name: '',
    email: '',
    password: '',
    avatarPath: ''
  })

  async register(email: string, password: string, name: string, avatarPath: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { photoURL: avatarPath, displayName: name });
        let newUser: User = this.setNewUserObject(userCredential.user.uid, name, email, avatarPath);
        await this.userService.addUser(newUser, userCredential.user.uid)
        await sendEmailVerification(userCredential.user);
        this.authService.loggedInUserSignal.set(userCredential.user);
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  setNewUserObject(id:string, name: string, avatarPath: string, email:string): User {
    return {
      id: id,
      name: name,
      avatarPath: avatarPath,
      email: email,
      loginState: 'loggedIn'
    }
  }

  getNewUserSignal() {
    return this.newUserSignal;
  }
}
