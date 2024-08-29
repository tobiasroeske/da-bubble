import { Component, EventEmitter, inject, Input, Output, WritableSignal } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { BoardStateService } from '../../../../shared/services/board-state-service/board-state.service';


@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent {
  @Input() currentUser!: WritableSignal<null | User | undefined>;
  @Output() editorOpen = new EventEmitter<boolean>();
  @Output() closeProfileDetail = new EventEmitter<boolean>();

  boardStateService = inject(BoardStateService);

  readonly GUESTID = 'y7WnIAhufRhCn54XusoiYWlXl4S2';


  openEditor(event: Event) {
    event.stopPropagation();
    this.editorOpen.emit(true);
  }

  closeProfile(event: Event) {
    event.stopPropagation();
    this.closeProfileDetail.emit(false);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
}
