import { TestBed } from '@angular/core/testing';

import { FundingStageService } from './funding-stage.service';

describe('FundingStageService', () => {
  let service: FundingStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundingStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
