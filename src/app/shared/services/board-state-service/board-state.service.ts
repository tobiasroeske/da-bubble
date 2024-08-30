import { Injectable, OnInit, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardStateService {
  profileOptionsSig = signal<boolean>(false)
  mobileView = signal<boolean>(false);
  tabletView = signal<boolean>(false);
  threadTranslate = signal<boolean>(false);
  sidenavTranslate = signal<boolean>(true);
  emojiPickerSmall = signal<boolean>(false);
  newMessageInputOpen = signal<boolean>(false);
  showNewMessageInput = signal<boolean>(false);
  showAddChannelDialog = signal<boolean>(false);

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize())
  }


  toggleProfileOptions() {
    this.profileOptionsSig.update(prev => !prev);
  }
  
  openAddChannelDialog() {
    this.showAddChannelDialog.set(true);
  }

  closeAddChannelDialog() {
    this.showAddChannelDialog.set(false);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }
  

  checkScreenSize() {
    if (window.innerWidth <= 1500) {
      this.showDesktopView();
    }
    if (window.innerWidth <= 768) {
      this.showMobileView();
    }
    if (window.innerWidth <= 420) {
      this.emojiPickerSmall.set(true);
    }
  }

  showDesktopView() {
    this.tabletView.set(true);
    this.mobileView.set(false); 
    if (this.threadTranslate() && this.sidenavTranslate()) {
      this.sidenavTranslate.set(false);
    }
  }

  showMobileView() {
    this.mobileView.set(true);
    this.tabletView.set(false);
    this.emojiPickerSmall.set(false);
  }

  toggleSidenav() {
    this.sidenavTranslate.update(prev => !prev);
    if (window.innerWidth <= 1500) {
      this.threadTranslate.set(false);
    }
    if (this.mobileView()) {
      this.newMessageInputOpen.set(false);
    }
  }


}
