import { Component, Input, WritableSignal } from '@angular/core';
import { User } from '../../../../shared/models/user.model';


@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  @Input() selectedMember!: WritableSignal<User |null>;
}
