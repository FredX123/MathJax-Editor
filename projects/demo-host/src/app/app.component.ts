import { Component } from '@angular/core';
import { MathEditorComponent } from 'mathjax-editor';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MathEditorComponent, ReactiveFormsModule]
})
export class AppComponent {
  title = 'demo-host';
  // Two-way binding example
  content = '';

  // Reactive forms example
  editorControl = new FormControl<string>('', { nonNullable: true });

  // Tabs
  activeTab: 'bind' | 'form' = 'bind';
}
