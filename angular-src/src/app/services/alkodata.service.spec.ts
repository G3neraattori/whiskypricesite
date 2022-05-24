import { TestBed } from '@angular/core/testing';

import { AlkodataService } from './alkodata.service';

describe('AlkodataService', () => {
  let service: AlkodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlkodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
