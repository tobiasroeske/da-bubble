import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';
import { Channel } from '../../../shared/models/channel.model';
import { AuthStateService } from '../../../shared/services/authentication/auth-state-service/auth-state.service';
import { User } from '../../../shared/models/user.model';
import { ChannelService } from '../../../shared/services/firestore/channel-service/channel.service';

@Component({
  selector: 'app-add-channel-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-channel-dialog.component.html',
  styleUrl: './add-channel-dialog.component.scss'
})
export class AddChannelDialogComponent {
  boardStateService = inject(BoardStateService)
  authStateService = inject(AuthStateService);
  channelService = inject(ChannelService);
  channel: Channel = new Channel();
  currentUser: WritableSignal<User | null | undefined> = this.authStateService.getUserSignal();
  showChannelExistsMessage = signal<boolean>(false)

  async onSubmit(ngForm: NgForm, event: Event) {
    let newChannel: Channel = {...this.channel, creatorId: this.currentUser()?.id, memberIds: [this.currentUser()?.id]} as Channel
    if (ngForm.valid && ngForm.submitted) {
      let channelExists = await this.channelService.channelTitleAlreadyExists(newChannel)
      this.showChannelExistsMessage.set(channelExists);
      if (channelExists) {
        return;
      } else {
        await this.channelService.addChannel(newChannel);
        ngForm.reset();
        this.boardStateService.closeAddChannelDialog();
      }
    }
  }

  
}
