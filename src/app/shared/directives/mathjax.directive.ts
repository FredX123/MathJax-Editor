import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { MathJaxService } from '../services/mathjax.service';

@Directive({ selector: '[appMathJax]' })
export class MathJaxDirective implements OnChanges {
  @Input() appMathJax: string = '';

  constructor(private el: ElementRef, private mathJaxService: MathJaxService) {}

  ngOnChanges(): void {
    this.renderMathJax();
  }

  private renderMathJax(): void {
    this.el.nativeElement.innerHTML = this.appMathJax ?? '';
    this.mathJaxService.typeset(this.el.nativeElement).catch(error => {
      console.error('MathJax rendering failed', error);
    });
  }
}
