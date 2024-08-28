import { inject, Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot } from 'firebase/firestore';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  userSignal = signal<User[]>([])
  loadingSignal = signal<boolean>(true);

  constructor() { }

  subscribeToUsers() {
    return onSnapshot(this.getCollectionReference('users'), data => {
      this.loadingSignal.set(true);
      let updatedUserList: User[] = [];
      data.forEach(doc => {
        let user: User = {...doc.data()} as User;
        updatedUserList.push(user);
      })
      this.userSignal.set(updatedUserList);
      this.loadingSignal.set(false);
    })
  }

  getUserSignal() {
    return this.userSignal;
  }

  getLoadingSignal() {
    return this.loadingSignal;
  }

  getCollectionReference(colName: string) {
    return collection(this.firestore, colName);
  }
}
