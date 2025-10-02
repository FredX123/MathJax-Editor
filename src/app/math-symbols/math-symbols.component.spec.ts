import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MathSymbolsComponent } from './math-symbols.component';

describe('MathSymbolsComponent', () => {
  let component: MathSymbolsComponent;
  let fixture: ComponentFixture<MathSymbolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MathSymbolsComponent],
    providers: [provideHttpClient(), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(MathSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
