import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Firestore, onSnapshot, collection, setDoc, doc } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';
import { Unsubscribe, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  userSignal = signal<User[]>([])
  unsubUserList: Unsubscribe;

  constructor() {
    this.unsubUserList = this.subscribeToUsers();
  }

  ngOnDestroy(): void {
    this.unsubUserList();
  }

  subscribeToUsers() {
    return onSnapshot(this.getUserCollectionReference(), data => {
      let updatedUserList: User[] = [];
      data.forEach(doc => {
        let user: User = { ...doc.data() } as User;
        updatedUserList.push(user);
      })
      this.userSignal.set(updatedUserList);
    })
  }

  async addUser(newUser: User, userId: string): Promise<void> {
    try {
      await setDoc(this.getUserDocReference(userId), { ...newUser });
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  async updateUserLoginState(userId: string, state: string) {
    try {
      let userRef = this.getUserDocReference(userId);
      await updateDoc(userRef, { loginState: state });
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  async updateUserDoc(userId:string, newUser: User) {
    try {
      let userRef = this.getUserDocReference(userId);
      await updateDoc(userRef, {...newUser});
    } catch (error) {
      
    }
  }

  getUserSignal() {
    return this.userSignal;
  }

  getUserCollectionReference() {
    return collection(this.firestore, 'users');
  }

  getUserDocReference(docId: string) {
    return doc(this.getUserCollectionReference(), docId)
  }
}
