import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  auth = inject(Auth);
  errorCode = signal<string>('');
  

  constructor() {}

  async updateUserProfile(changes: {}): Promise<void> {
    try {
      if (this.auth.currentUser) {
        await updateProfile(this.auth.currentUser, changes);
      }
    } catch (err: any) {
      
      this.errorCode.set(err.code);
      console.error('Error while updating auth user profile', err.code);
      throw err;
    }
  }

  async updateEmail(email: string): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        await verifyBeforeUpdateEmail(currentUser, email);
      }
    } catch (err: any) {
      if (err.code == 'auth/requires-recent-login') {
        this.errorCode.set(err.code);
      } else {
        console.error('Error while updating auth user email', err.code);
        throw err;
      }
    }
  }
}
