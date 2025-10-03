import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathjaxEditorComponent } from './mathjax-editor.component';

describe('MathjaxEditorComponent', () => {
  let component: MathjaxEditorComponent;
  let fixture: ComponentFixture<MathjaxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathjaxEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathjaxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
