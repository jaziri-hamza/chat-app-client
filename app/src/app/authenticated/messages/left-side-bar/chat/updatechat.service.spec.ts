/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdatechatService } from './updatechat.service';

describe('Service: Updatechat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatechatService]
    });
  });

  it('should ...', inject([UpdatechatService], (service: UpdatechatService) => {
    expect(service).toBeTruthy();
  }));
});
