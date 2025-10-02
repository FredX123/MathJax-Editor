import { Component } from '@angular/core';
import { MathEditorComponent } from './math-editor/math-editor.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [MathEditorComponent]
})
export class AppComponent {
  title = 'math-editor-demo';
}
