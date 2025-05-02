import { TestBed } from '@angular/core/testing';

import { CozinhaService } from './cozinha.service';

describe('CozinhaService', () => {
  let service: CozinhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CozinhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
