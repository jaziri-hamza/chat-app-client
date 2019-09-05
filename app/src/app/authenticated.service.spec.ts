/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticatedService } from './authenticated.service';

describe('Service: Authenticated', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedService]
    });
  });

  it('should ...', inject([AuthenticatedService], (service: AuthenticatedService) => {
    expect(service).toBeTruthy();
  }));
});
