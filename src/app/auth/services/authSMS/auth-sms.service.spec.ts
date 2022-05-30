import { TestBed } from '@angular/core/testing';

import { AuthSMSService } from './auth-sms.service';

describe('AuthSMSService', () => {
  let service: AuthSMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
