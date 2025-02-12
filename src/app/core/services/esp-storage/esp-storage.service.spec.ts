import { TestBed } from '@angular/core/testing';

import { EspStorageService } from './esp-storage.service';

describe('EspStorageService', () => {
  let service: EspStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
