import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MathEditorComponent } from 'mathjax-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, MathEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo-host';
  example = new FormControl('');
}
