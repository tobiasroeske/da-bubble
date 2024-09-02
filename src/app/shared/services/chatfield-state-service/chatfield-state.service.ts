import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserService } from '../firestore/user-service/user.service';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ChatfieldStateService {
  showMembersDialog = signal<boolean>(false);
  showAddMemberDialog = signal<boolean>(false);
  showMemberDetail = signal<boolean>(false);

  constructor() { }

  toggleMembersDialog(e: boolean | Event) {
    this.showMembersDialog.update(prev => !prev);
  }

  openAddMemberDialog(e: Event) {
    e.preventDefault();
    this.showAddMemberDialog.set(true);
  }

  
}
