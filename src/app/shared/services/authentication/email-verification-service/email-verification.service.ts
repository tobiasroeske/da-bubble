import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { applyActionCode, checkActionCode } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  auth = inject(Auth);

  constructor() {}

  async verifyEmail(actionCode: string): Promise<void> {
    try {
      await applyActionCode(this.auth, actionCode);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async handleEmailUpdate(actionCode: string): Promise<void> {
    try {
      const info = await checkActionCode(this.auth, actionCode);
      const restoredMail = info.data.email;
      await applyActionCode(this.auth, actionCode);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}
