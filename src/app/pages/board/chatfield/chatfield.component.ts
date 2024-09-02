import { Component, effect, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Channel } from '../../../shared/models/channel.model';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';
import { UserService } from '../../../shared/services/firestore/user-service/user.service';
import { User } from '../../../shared/models/user.model';
import { MembersDialogComponent } from "./members-dialog/members-dialog.component";
import { AddMemberDialogComponent } from "./add-member-dialog/add-member-dialog.component";
import { ChatfieldStateService } from '../../../shared/services/chatfield-state-service/chatfield-state.service';

@Component({
  selector: 'app-chatfield',
  standalone: true,
  imports: [MembersDialogComponent, AddMemberDialogComponent],
  templateUrl: './chatfield.component.html',
  styleUrl: './chatfield.component.scss'
})
export class ChatfieldComponent implements OnInit {
  @Input() channels!: WritableSignal<Channel[]>;

  boardStateService = inject(BoardStateService);
  userService = inject(UserService);
  chatfieldStateService = inject(ChatfieldStateService);

  channelMembers = signal<User[]>([]);
  userSignal = this.userService.getUserSignal();
  currentChannel: Channel | undefined;

  constructor() {
    
    effect(() => {
      this.currentChannel = this.getCurrentChannel();
    })
  }

  ngOnInit(): void {
   this.getChannelMembers();
  }

  getCurrentChannel() {
    let currentChannel = this.channels()[this.boardStateService.indexOfCurrentChannel()]
    return currentChannel;
  }

  getChannelMembers() {
    let members: User[] = [];
    this.currentChannel?.memberIds.forEach(member => {
      this.userSignal().forEach(user => {
        if (member === user.id) {
          members.push(user);
        }
      })
    })
    return members;
  }
}
