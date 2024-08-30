import { Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../shared/services/authentication/authService/auth.service';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { User as AuthUser } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { BackToLoginComponent } from '../back-to-login/back-to-login.component';
import { LoadingComponent } from '../loading/loading.component';
import { BoardToolbarComponent } from '../board-toolbar/board-toolbar.component';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Channel } from '../../../shared/models/channel.model';
import { ChannelService } from '../../../shared/services/firestore/channel-service/channel.service';
import { AuthStateService } from '../../../shared/services/authentication/auth-state-service/auth-state.service';
import { AddChannelDialogComponent } from "../add-channel-dialog/add-channel-dialog.component";

@Component({
  selector: 'app-board-layout',
  standalone: true,
  imports: [CommonModule, BackToLoginComponent, LoadingComponent, BoardToolbarComponent, SidenavComponent, AddChannelDialogComponent],
  templateUrl: './board-layout.component.html',
  styleUrl: './board-layout.component.scss'
})
export class BoardLayoutComponent implements OnDestroy, OnInit {
  authService = inject(AuthService);
  authStatusService = inject(AuthStateService);
  channelService = inject(ChannelService)
  boardStateService = inject(BoardStateService);
  currentUserSignal = this.authStatusService.getUserSignal();
  //channelsSignal = signal<Channel[]>([]);
  channelSignal = this.channelService.getChannelSignal();
  userLoggedIn = signal<boolean>(true)
  userTimeout: any;
  channelSubscription: Subscription | null = null;

  constructor() {

    effect(() => {
      this.logData();
    })
  }

  ngOnInit(): void {
    // this.channelSubscription = this.channelService.channel$.subscribe(channel => {
    //   this.channelsSignal.set(channel);
    //   console.log(this.channelsSignal());
    // })
    this.handleUserTimeout();
  }

  logData() {
    let currentUser = this.currentUserSignal();
    let loadedChannels = this.channelSignal();
    console.log('loaded channels', loadedChannels);
    console.log('Current is..', currentUser);
  }

  handleUserTimeout() {
    this.userTimeout = setTimeout(() => {
      if (this.currentUserSignal() == null) {
        this.userLoggedIn.set(false);
      } else {
        this.userLoggedIn.set(true);
      }
    },5000)
  }

  ngOnDestroy(): void {
    clearTimeout(this.userTimeout);
    this.channelSubscription?.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
  }
}
