import { TestBed, inject } from '@angular/core/testing';

import { RegService } from './reg.service';

describe('RegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegService]
    });
  });

  it('should be created', inject([RegService], (service: RegService) => {
    expect(service).toBeTruthy();
  }));
});
