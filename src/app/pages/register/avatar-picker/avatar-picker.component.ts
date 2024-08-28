import { Component, EventEmitter, inject, Input, Output, WritableSignal } from '@angular/core';
import { User } from 'firebase/auth';
import { CloudStorageService } from '../../../shared/services/cloud-storage-service/cloud-storage.service';
import { RegistrationService } from '../../../shared/services/authentication/registration-service/registration.service';

type UserForRegistration = {
  name: string,
  email: string,
  password: string, 
  avatarPath: string,
}

@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})
export class AvatarPickerComponent {
  @Output() goBack = new EventEmitter<boolean>();
  @Output() signUpSuccessful = new EventEmitter<boolean>();

  registerService = inject(RegistrationService);
  cloudStorageService = inject(CloudStorageService);

  userSignal: WritableSignal<UserForRegistration>;
  user: UserForRegistration;
  avatars: string[] = ['/img/avatar0.png', '/img/avatar1.png', '/img/avatar2.png', '/img/avatar3.png', '/img/avatar4.png', '/img/avatar5.png']
  avatarImgPath = '/img/profile_big.png';
  avatarPicked = false;

  constructor() {
      this.userSignal = this.registerService.getNewUserSignal();
      this.user = this.userSignal();
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const path = `avatarImages/${file.name}`;
      try {
        await this.cloudStorageService.uploadFile(path, file);
        const url = await this.cloudStorageService.getDownloadUrl(path);
        this.user.avatarPath = url;
        this.avatarImgPath = url;
        this.avatarPicked = true;
      } catch (err) {
        console.error('Error handling file change:', err);
      }
    }
  }

  goBackToRegister(): void {
    this.goBack.emit(false)
    this.registerService.errorCode = '';
  }

  async completeSignup(): Promise<void> {
    await this.registerService.register(this.user.email, this.user.password, this.user.name, this.user.avatarPath);
    this.userSignal.set(this.user);
    this.signUpSuccessful.emit(true);
  }

  pickAvatar(i: number): void {
    this.user.avatarPath = this.avatars[i];
    this.avatarImgPath = this.avatars[i];
    this.avatarPicked = true;
  }
}
