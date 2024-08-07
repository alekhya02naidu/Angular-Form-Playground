import { TestBed } from '@angular/core/testing';

import { ProviderServiceService } from './provider-service.service';

describe('ProviderServiceService', () => {
  let service: ProviderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
