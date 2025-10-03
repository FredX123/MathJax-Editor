import { TestBed } from '@angular/core/testing';

import { MathjaxEditorService } from './mathjax-editor.service';

describe('MathjaxEditorService', () => {
  let service: MathjaxEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathjaxEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
