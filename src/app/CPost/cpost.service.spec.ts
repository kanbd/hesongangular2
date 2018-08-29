import { TestBed, inject } from '@angular/core/testing';

import { CpostService } from './cpost.service';

describe('CpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpostService]
    });
  });

  it('should be created', inject([CpostService], (service: CpostService) => {
    expect(service).toBeTruthy();
  }));
});
