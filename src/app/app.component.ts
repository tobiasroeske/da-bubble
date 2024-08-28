import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from './shared/services/firestore-service/firestore.service';
import { Unsubscribe } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DABubble';
  
}
