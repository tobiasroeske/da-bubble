import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { User } from '../../../models/user.model';
import { Auth, user, User as AuthUser } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService implements OnDestroy{
  private auth = inject(Auth);
  private userSignal = signal<User | null | undefined>(undefined);
  private authSubscription: Subscription | null = null;
  
  constructor() {
    this.initializeAuthState();
  }

  getUserSignal() {
    return this.userSignal;
  }
  setUser(user: User | null | undefined) {
    this.userSignal.set(user);
  }

  initializeAuthState() {
    this.authSubscription = user(this.auth).subscribe((authUser: AuthUser | null) => {
      if (authUser) {
        let currentUser = this.setCurrentUserObject(authUser);
        this.setUser(currentUser);
      } else {
        this.setUser(null);
      }
    })
  }

  setCurrentUserObject(user: AuthUser): User {
    return {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      avatarPath: user.photoURL,
      loginState: 'loggedIn'
    } as User
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
