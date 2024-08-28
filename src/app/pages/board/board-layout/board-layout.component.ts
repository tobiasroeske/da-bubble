import { Component, inject, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { AuthService } from '../../../shared/services/authentication/authService/auth.service';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/firestore/user-service/user.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-board-layout',
  standalone: true,
  imports: [],
  templateUrl: './board-layout.component.html',
  styleUrl: './board-layout.component.scss'
})
export class BoardLayoutComponent implements OnDestroy {
  authService = inject(AuthService);
  userService = inject(UserService)
  localStorageService = inject(LocalStorageService)
  userSignal = this.userService.getUserSignal();
  userList: User[] = [];
  private userSubscription: Subscription;
  currentUser: User | undefined;

  constructor() {
    this.userSubscription = this.userService.user$.subscribe(users => {
      this.userList = users;
      console.log(this.userList);
      this.currentUser = this.userList.find(user => user.id == this.localStorageService.loadUserId())
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
  }
}
