import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInComponent, ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  forgotPassword = false;
  smallScreen = false;
  confirmationMessage = false;

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event): void {
    event.preventDefault();
   
  }

  @HostListener('window:resize', ['$event'])
  handleResize(event: Event): void {
    if (window.innerWidth <= 760) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  openPasswordDialog($event: boolean) {
    this.forgotPassword = $event;
  }

  showConfirmation(event: boolean) {
    this.confirmationMessage = event;
  }
}
