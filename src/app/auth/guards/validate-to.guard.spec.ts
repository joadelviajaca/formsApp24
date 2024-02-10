import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { validateToGuard } from './validate-to.guard';

describe('validateToGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateToGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
