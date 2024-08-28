import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../shared/services/authentication/registration-service/registration.service';
import { User } from '../../shared/models/user.model';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AvatarPickerComponent } from './avatar-picker/avatar-picker.component';

type UserForRegistration = {
  name: string,
  email: string,
  password: string, 
  avatarPath: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SignupFormComponent, AvatarPickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router)
  registerService = inject(RegistrationService)
  user: UserForRegistration | undefined;
 
  next = false;
  signupSuccessful = false;
  smallScreen = false;

  @HostListener('window:resize', ['$event'])
  handleResize(event: Event) {
    this.smallScreen = window.innerWidth <= 760;
  }

  ngOnInit(): void {
    this.smallScreen = window.innerWidth <= 760;
  }

  goToAvatarPicker($event: boolean) {
    this.next = $event;
  }

  getUserDetail($event: UserForRegistration) {
    this.user = $event;
  }

  async signup($event: boolean): Promise<void> {
    console.log()
    // try {
    //   await this.registerService.register();
    //   this.signupSuccessful = $event;
    // } catch (error) {
    //   console.error('Signup error:', error);
    // }
  }
}
