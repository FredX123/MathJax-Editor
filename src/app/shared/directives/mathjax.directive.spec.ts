import { ElementRef } from '@angular/core';
import { MathJaxDirective } from './mathjax.directive';

class MathJaxServiceStub {
  typeset(): Promise<void> {
    return Promise.resolve();
  }
}

describe('MathJaxDirective', () => {
  it('should create an instance', () => {
    const element = document.createElement('div');
    const elementRef = new ElementRef(element);
    const directive = new MathJaxDirective(elementRef, new MathJaxServiceStub() as any);
    expect(directive).toBeTruthy();
  });
});
