import { TestBed } from '@angular/core/testing';

import { ApplicationEntryStageService } from './application-entry-stage.service';

describe('ApplicationEntryStageService', () => {
  let service: ApplicationEntryStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationEntryStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
