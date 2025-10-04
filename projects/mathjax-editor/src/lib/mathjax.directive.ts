import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { MathJaxService } from './mathjax.service';

@Directive({ selector: '[mathjaxRender]', standalone: true })
export class MathJaxDirective implements OnChanges {
  @Input('mathjaxRender') content: string = '';

  constructor(private el: ElementRef, private mathJaxService: MathJaxService) {}

  ngOnChanges(): void {
    this.renderMathJax();
  }

  private renderMathJax(): void {
    const markup = this.content ?? '';
    if (/<(?:math|script|span|div)/i.test(markup)) {
      this.el.nativeElement.innerHTML = markup;
    } else {
      this.el.nativeElement.textContent = markup;
    }
    this.mathJaxService.typeset(this.el.nativeElement).catch(error => {
      console.error('MathJax rendering failed', error);
    });
  }
}
