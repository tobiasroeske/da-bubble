import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { User } from '../../../models/user.model';
import { FirestoreService } from '../../firestore-service/firestore.service';

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
  firestoreService = inject(FirestoreService);
  user: User;
  errorCode: string | null = null;
  signUpSuccessful: boolean = false;
  newUserSignal = signal<UserForRegistration>({
    name: '',
    email: '',
    password: '',
    avatarPath: ''
  })

  constructor() {
    this.user = new User()
  }

  async register(email: string, password: string, name: string, avatarPath: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { photoURL: avatarPath, displayName: name });
        //await this.firestoreService.addUser(userCredential.user.uid, this.setNewUserObject(userCredential.user.uid));
        await sendEmailVerification(userCredential.user);
        //this.router.navigateByUrl('board');
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  getNewUserSignal() {
    return this.newUserSignal;
  }

  setNewUserObject(userId: string): User {
    return {
      id: userId,
      name: this.user.name || '',
      email: this.user.email || '',
      avatarPath: this.user.avatarPath || '',
      loginState: 'loggedOut',
    };
  }
}
