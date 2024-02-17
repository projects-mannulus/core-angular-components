/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrudContainerService } from './crudContainer.service';

describe('Service: CrudContainer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudContainerService]
    });
  });

  it('should ...', inject([CrudContainerService], (service: CrudContainerService) => {
    expect(service).toBeTruthy();
  }));
});
