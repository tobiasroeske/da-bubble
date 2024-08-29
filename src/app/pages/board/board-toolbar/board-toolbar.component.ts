import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';
import { User } from '../../../shared/models/user.model';
import { fromAsyncIterable } from 'rxjs/internal/observable/innerFrom';
import { AuthService } from '../../../shared/services/authentication/authService/auth.service';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

@Component({
  selector: 'app-board-toolbar',
  standalone: true,
  imports: [ProfileDetailComponent, ProfileEditorComponent],
  templateUrl: './board-toolbar.component.html',
  styleUrl: './board-toolbar.component.scss'
})
export class BoardToolbarComponent {
  @Input() currentUser!: WritableSignal<User | null | undefined>;
  boardStateService = inject(BoardStateService)
  authService = inject(AuthService)
  showOverlay = signal<boolean>(false);
  showProfileMenu = signal<boolean>(false);
  showProfileDetail = signal<boolean>(false);
  showEditor = signal<boolean>(false);

  openProfileDetail(event: Event) {
    event.stopPropagation();
    this.showProfileDetail.set(true);
    this.showProfileMenu.set(false);
  }

  toggleProfileMenu() {
    this.showOverlay.update(prev => !prev);
    this.showProfileMenu.update(prev => !prev);
  }

  closeAllDialogs() {
    this.showOverlay.set(false);
    this.showProfileDetail.set(false);
    this.showProfileMenu.set(false);
    this.showEditor.set(false);
  }

  openEditor(event: boolean) {
    this.showEditor.set(event);
    this.showProfileDetail.set(false);
  }

}
