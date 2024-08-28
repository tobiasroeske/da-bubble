import { Component, EventEmitter, inject, Output, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegistrationService } from '../../../shared/services/authentication/registration-service/registration.service';

type UserForRegistration = {
  name: string,
  email: string,
  password: string, 
  avatarPath: string,
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  @Output() showNextPage = new EventEmitter<boolean>();
  registerService = inject(RegistrationService);

  userSignal: WritableSignal<UserForRegistration>;
  user: UserForRegistration;
  checkboxChecked = false;

  constructor() {
    this.user = { name:'', email: '', password: '', avatarPath: '' }
    this.userSignal = this.registerService.getNewUserSignal();
    console.log(this.user);
  }
  
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.userSignal.set(this.user);
      console.log(this.userSignal());
      this.showNextPage.emit(true);
    }
  }
}
