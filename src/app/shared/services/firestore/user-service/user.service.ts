import { inject, Injectable, signal } from '@angular/core';
import { Firestore, onSnapshot, collection, setDoc, doc } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  userSignal = signal<User[]>([])
  loadingSignal = signal<boolean>(true);

  constructor() { }

  subscribeToUsers() {
    return onSnapshot(this.getUserCollectionReference(), data => {
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

  async addUser(newUser: User, userId: string) {
    try {
      await setDoc(this.getUserDocReference(userId), {...newUser});
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  getUserSignal() {
    return this.userSignal;
  }

  getLoadingSignal() {
    return this.loadingSignal;
  }

  getUserCollectionReference() {
    return collection(this.firestore, 'users');
  }

  getUserDocReference(docId: string) {
    return doc(this.getUserCollectionReference(), docId)
  }
}
