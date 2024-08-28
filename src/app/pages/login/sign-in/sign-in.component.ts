import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication/authService/auth.service';
import { GoogleAuthService } from '../../../shared/services/authentication/google-auth-service/google-auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @Input() smallScreen!: boolean;
  @Output() passwordForgotten = new EventEmitter<boolean>();

  authService = inject(AuthService);
  googleAuthService = inject(GoogleAuthService);
  router = inject(Router);

  mail!: string;
  password!: string;
  errorMessage = false;

  async onSubmit(ngForm: NgForm): Promise<void> {
    if (ngForm.submitted) {
      const rawForm = ngForm.form.getRawValue();
      try {
        await this.authService.login(rawForm.email, rawForm.password);
        this.router.navigateByUrl('board');
      } catch (err) {
        console.error('Login error:', err);
        this.errorMessage = true;
      }
    }
  }

  async guestLogin(): Promise<void> {
    try {
      await this.authService.guestLogin();
      this.router.navigateByUrl('board');
    } catch (err) {
      console.error('Guest login error:', err);
    }
  }

  async googleLogin(): Promise<void> {
    try {
      await this.googleAuthService.googlePopupLogin();
      this.router.navigateByUrl('board');
    } catch (err) {
      console.error('Google login error:', err);
    }
  }

  forgotPassword(): void {
    this.passwordForgotten.emit(true);
  }

}
