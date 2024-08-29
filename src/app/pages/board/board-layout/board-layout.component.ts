import { Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../shared/services/authentication/authService/auth.service';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/firestore/user-service/user.service';
import { Subscription } from 'rxjs';
import { User as AuthUser } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { BackToLoginComponent } from '../back-to-login/back-to-login.component';
import { LoadingComponent } from '../loading/loading.component';
import { BoardToolbarComponent } from '../board-toolbar/board-toolbar.component';
import { BoardStateService } from '../../../shared/services/board-state-service/board-state.service';

@Component({
  selector: 'app-board-layout',
  standalone: true,
  imports: [CommonModule, BackToLoginComponent, LoadingComponent, BoardToolbarComponent],
  templateUrl: './board-layout.component.html',
  styleUrl: './board-layout.component.scss'
})
export class BoardLayoutComponent implements OnDestroy, OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  boardStateService = inject(BoardStateService);
  userSignal = this.userService.getUserSignal();
  currentUserSignal = signal<User | null | undefined>(undefined);
  private currentUserSubscription: Subscription | null = null
  userLoggedIn = signal<boolean>(true)
  userTimeout: any;

  ngOnInit(): void {
    this.subscribeCurrentUser();
    this.handleUserTimeout();
  }

  subscribeCurrentUser() {
    this.currentUserSubscription = this.authService.user$.subscribe((user: AuthUser) => {
      if (user) {
        this.currentUserSignal.set({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          avatarPath: user.photoURL,
          loginState: 'loggedIn'
        }) 
      } else {
        this.currentUserSignal.set(null);
        
      }
      console.log(this.currentUserSignal())
    })
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
    this.currentUserSubscription?.unsubscribe();
    clearTimeout(this.userTimeout);
  }

  async logout() {
    await this.authService.logout();
  }
}
