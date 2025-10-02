import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathJaxDirective } from './directives/mathjax.directive';



@NgModule({
    imports: [
        CommonModule,
        MathJaxDirective
    ],
    exports: [MathJaxDirective]
})
export class SharedModule { }
