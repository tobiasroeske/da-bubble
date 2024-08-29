import { Component, effect, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { CloudStorageService } from '../../../../shared/services/cloud-storage-service/cloud-storage.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserProfileService } from '../../../../shared/services/authentication/user-profile-service/user-profile.service';
import { UserService } from '../../../../shared/services/firestore/user-service/user.service';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.scss'
})
export class ProfileEditorComponent {
  @Input() currentUser!: WritableSignal<User | null | undefined>;
  @Output() showEditor = new EventEmitter<boolean>();
  cloudStorageService = inject(CloudStorageService)
  userProfileService = inject(UserProfileService);
  userService = inject(UserService);
  editingAvatar = signal<boolean>(false);
  avatarPath: string | undefined | null;
  avatars: string[] = ['/img/avatar0.png', '/img/avatar1.png', '/img/avatar2.png', '/img/avatar3.png', '/img/avatar4.png', '/img/avatar5.png'];
  fullname: string | null | undefined;
  mail: string | null | undefined;
  changesSuccessful = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.fullname = this.currentUser()?.name;
      this.mail = this.currentUser()?.email;
      this.avatarPath = this.currentUser()?.avatarPath;
    })
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


  closeEditor(event: Event) {
    event.stopPropagation();
    this.showEditor.emit(false);
  }

  toggleAvatarEditor() {
    this.editingAvatar.update(prev => !prev);
  }

  pickAvatar(i: number, event: Event): void {
    event.stopPropagation();
    this.avatarPath = this.avatars[i];
    this.editingAvatar.set(false);
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const path = `avatarImages/${file.name}`;
      try {
        await this.uploadAvatar(path, file);
      } catch (error) {
        console.error('Error handling file change:', error);
      }
    }
  }

  async uploadAvatar(path: string, file: any): Promise<void> {
    await this.cloudStorageService.uploadFile(path, file);
    this.avatarPath = await this.cloudStorageService.getDownloadUrl(path);
    this.editingAvatar.set(false);
  }

  async onSubmit(ngForm: NgForm): Promise<void> {
    if (ngForm.submitted && ngForm.form.valid) {
      if (this.currentUser) {
        let updatedUser = this.getUpdatedUser();
        await this.userProfileService.updateUserProfile({ displayName: this.fullname, photoURL: this.avatarPath });
        await this.userProfileService.updateEmail(this.mail!);
        await this.userService.updateUserDoc(updatedUser!.id!, updatedUser!)
        this.currentUser.set(updatedUser)
        this.changesSuccessful.set(true);
      }
    }
  }

  getUpdatedUser(): User | undefined {
    if (this.currentUser()) {
      return {
        ...this.currentUser(),
        name: this.fullname!,
        email: this.mail!,
        avatarPath: this.avatarPath!
      } as User
    } else {
      return;
    }

  }
}
