import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathSymbolsComponent } from './math-symbols.component';

describe('MathSymbolsComponent', () => {
  let component: MathSymbolsComponent;
  let fixture: ComponentFixture<MathSymbolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MathSymbolsComponent]
});
    fixture = TestBed.createComponent(MathSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load default tex palette', () => {
    expect(component.symbolGroups.length).toBeGreaterThan(0);
    expect(component.currentSymbols.length).toBeGreaterThan(0);
  });
});
