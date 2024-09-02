import { Component, inject, Input, signal } from '@angular/core';
import { BoardStateService } from '../../../../shared/services/board-state-service/board-state.service';
import { User } from '../../../../shared/models/user.model';
import { MemberDetailComponent } from "../member-detail/member-detail.component";
import { ChatfieldStateService } from '../../../../shared/services/chatfield-state-service/chatfield-state.service';

@Component({
  selector: 'app-members-dialog',
  standalone: true,
  imports: [MemberDetailComponent],
  templateUrl: './members-dialog.component.html',
  styleUrl: './members-dialog.component.scss'
})
export class MembersDialogComponent {
  @Input() channelMembers!: User[];
  selectedMember = signal<User | null>(null);

  boardStateService = inject(BoardStateService);
  chatfieldStateService = inject(ChatfieldStateService);

  openMemberDetail(i: number) {
    this.selectedMember.set(this.channelMembers[i]);
  }
}
