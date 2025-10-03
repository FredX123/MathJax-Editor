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

  it('should activate tabs on click and keyboard', () => {
    const second = component.symbolGroups[1].title;
    component.activateTab(new MouseEvent('click'), second);
    expect(component.currentTab).toBe(second);

    const third = component.symbolGroups[2].title;
    component.activateTab(new KeyboardEvent('keydown', { key: 'Enter' }), third);
    expect(component.currentTab).toBe(third);

    const initial = component.symbolGroups[0].title;
    component.activateTab(new KeyboardEvent('keydown', { key: 'a' }), initial);
    expect(component.currentTab).toBe(third);
  });
});
