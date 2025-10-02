import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MathEditorComponent } from './math-editor.component';

describe('MathEditorComponent', () => {
  let component: MathEditorComponent;
  let fixture: ComponentFixture<MathEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MathEditorComponent],
    providers: [provideHttpClient(), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(MathEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
