import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';
import { Channel } from '../../../shared/models/channel.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() channels!: WritableSignal<Channel[]>

  boardStateService = inject(BoardStateService);
  channelHeaderIsClicked = signal<boolean>(true);
  canTranslateYChannel = signal<boolean>(true);

  toggleNewMessageInput(event: Event) {
    event.stopPropagation();
    this.boardStateService.newMessageInputOpen.update(prev => !prev);
    if (this.boardStateService.mobileView()) {
      this.boardStateService.sidenavTranslate.set(false);
    }
  }

  selectChannel(index: number) {
    this.boardStateService.indexOfCurrentChannel.set(index);
  }

  onHeaderClick() {
    if (!this.channelHeaderIsClicked()) {
      this.channelHeaderIsClicked.set(true)
      setTimeout(() => {
        this.canTranslateYChannel.set(true);
      }, 30)
    } else {
      this.canTranslateYChannel.set(false);
      setTimeout(() => {
        this.channelHeaderIsClicked.set(false);
      }, 50)
    }
  }
}
