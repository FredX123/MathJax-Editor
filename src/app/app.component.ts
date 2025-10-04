import { Component } from '@angular/core';
import { MathEditorComponent } from 'mathjax-editor';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [MathEditorComponent]
})
export class AppComponent {
  title = 'math-editor-demo';
}
