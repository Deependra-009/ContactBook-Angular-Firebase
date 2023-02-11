import { TestBed } from '@angular/core/testing';

import { ContactBookServicesService } from './contact-book-services.service';

describe('ContactBookServicesService', () => {
  let service: ContactBookServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactBookServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
