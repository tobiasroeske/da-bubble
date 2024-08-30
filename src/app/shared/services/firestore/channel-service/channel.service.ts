import { effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { User, Unsubscribe } from 'firebase/auth';
import { collection, doc, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../../../models/channel.model';
import { AuthStateService } from '../../authentication/auth-state-service/auth-state.service';
import { addDoc, getDocs, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private authStateService = inject(AuthStateService);
  private channelsSignal = signal<Channel[]>([]);
  private channelCollection = signal<Channel[]>([]);
  private channelSubscription: Unsubscribe | null = null;

  constructor() {
    let currentUserSignal = this.authStateService.getUserSignal();
    effect(() => {
      if (currentUserSignal()) {
        this.channelSubscription = this.subscribeToChannels(currentUserSignal()!.id!)
      } else {
        this.channelSubscription = null;
      }
    })
  }

  subscribeToChannels(userId: string) {
    const q = query(this.getChannelColRef(), where('memberIds', 'array-contains', userId));
    return onSnapshot(q, querySnapshot => {
      let loadedChannels: Channel[] = [];
      querySnapshot.forEach(channel => {
        let singleChannel: Channel = { ...channel.data() } as Channel;
        loadedChannels.push(singleChannel);
      })
      this.setChannelSignal(loadedChannels);
    })
  }

  async loadAllChannels() {
    try {
      let querySnapshot = await getDocs(this.getChannelColRef());
      let allChannels: Channel[] = []
      querySnapshot.forEach(channel => {
        allChannels.push(channel.data() as Channel);
      })
      this.channelCollection.set(allChannels);
    } catch (error) {
      console.error('Error while loading whole Channel collection', error);
    }
  }

  async addChannel(newChannel: Channel) {
    try {
      let response = await addDoc(this.getChannelColRef(), {...newChannel});
      if (response?.id) {
        let newChannelId = response.id;
        await updateDoc(this.getChannelDocRef(newChannelId), { id: newChannelId });
      }
    } catch (error) {
      console.error('Error adding new channel', error);
      throw(new Error);
    }
  }

  async channelTitleAlreadyExists(newChannel: Channel) {
    await this.loadAllChannels()
    let exists = this.channelCollection().some(channel => channel.title === newChannel.title);
    return exists;
  }

  setChannelSignal(channels: Channel[]) {
    this.channelsSignal.set(channels);
  }

  getChannelSignal() {
    return this.channelsSignal;
  }

  getChannelColRef() {
    return collection(this.firestore, 'channels');
  }

  getChannelDocRef(channelId: string) {
    return doc(this.getChannelColRef(), channelId);
  }
  ngOnDestroy(): void {
    if (this.channelSubscription) {
      this.channelSubscription();
    }
  }
}
