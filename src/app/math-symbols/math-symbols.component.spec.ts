import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathSymbolsComponent } from './math-symbols.component';

describe('MathSymbolsComponent', () => {
  let component: MathSymbolsComponent;
  let fixture: ComponentFixture<MathSymbolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathSymbolsComponent]
    });
    fixture = TestBed.createComponent(MathSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
