import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathJaxDirective } from './directives/mathjax.directive';



@NgModule({
  declarations: [
    MathJaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [MathJaxDirective]
})
export class SharedModule { }
