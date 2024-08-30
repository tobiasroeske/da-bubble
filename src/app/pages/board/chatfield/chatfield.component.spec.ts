import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatfieldComponent } from './chatfield.component';

describe('ChatfieldComponent', () => {
  let component: ChatfieldComponent;
  let fixture: ComponentFixture<ChatfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatfieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
