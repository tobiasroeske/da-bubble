import { TestBed } from '@angular/core/testing';

import { ChatfieldStateService } from './chatfield-state.service';

describe('ChatfieldStateService', () => {
  let service: ChatfieldStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatfieldStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
