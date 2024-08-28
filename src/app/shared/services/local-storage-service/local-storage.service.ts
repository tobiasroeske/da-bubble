import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveUserId(userId:string) {
    localStorage.setItem('userId', userId);
  }

  loadUserId() {
    return localStorage.getItem('userId');
  }
}
