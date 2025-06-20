import { TestBed } from '@angular/core/testing';
import { ExcecaoService } from './excecao.service';

describe('ExcecaoService', () => {
  let service: ExcecaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcecaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
