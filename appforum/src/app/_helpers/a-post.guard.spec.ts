import { TestBed } from '@angular/core/testing';

import { APostGuard } from './a-post.guard';

describe('APostGuard', () => {
  let guard: APostGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(APostGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
