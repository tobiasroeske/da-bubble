import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  auth = inject(Auth);
  

  constructor() {}

  async updateUserProfile(changes: {}): Promise<void> {
    try {
      if (this.auth.currentUser) {
        await updateProfile(this.auth.currentUser, changes);
      }
    } catch (err: any) {
      console.error(err);
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
      console.error(err);
      throw err;
    }
  }
}
