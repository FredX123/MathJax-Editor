import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

declare const MathJax: any;

@Directive({
  selector: '[appMathJax]'
})
export class MathJaxDirective implements OnChanges {
  @Input() appMathJax: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.renderMathJax();
  }

  renderMathJax(): void {
    this.el.nativeElement.innerHTML = this.appMathJax;
    MathJax.typesetPromise([this.el.nativeElement]);
  }
}
