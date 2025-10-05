# @mathcode/mathjax-editor

Standalone Angular 19 components for editing and rendering math with MathJax.
Supports TeX, MathML, and AsciiMath; includes a compact symbol palette with search.

## Install

```
npm i @mathcode/mathjax-editor mathjax
```

Configure MathJax in your app (Angular CLI):

1) angular.json (application project)

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  { "glob": "**/*", "input": "node_modules/mathjax/sre", "output": "sre" },
  { "glob": "**/*", "input": "node_modules/mathjax/input", "output": "input" }
],
"scripts": [
  "node_modules/mathjax/tex-mml-chtml.js"
]
```

2) src/index.html (define config before script loads)

```
<script>
  window.MathJax = {
    loader: { load: ['input/tex', 'input/mml', 'input/asciimath'] },
    tex: { inlineMath: [['\\(', '\\)'], ['$', '$']], displayMath: [['\\[', '\\]'], ['$$', '$$']], processEscapes: true },
    asciimath: { delimiters: [['`','`']] },
    svg: { fontCache: 'global' },
    startup: { typeset: false }
  };
</script>
```

## Quick usage

All components are standalone. Import and drop into any component.

Template‑driven (ngModel)
```
// component.ts
import { FormsModule } from '@angular/forms';
import { MathEditorComponent } from '@mathcode/mathjax-editor';
content = '';

// component metadata
imports: [FormsModule, MathEditorComponent]

// template
<app-math-editor name="math" [(ngModel)]="content"></app-math-editor>
```

Reactive Forms
```
// component.ts
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MathEditorComponent } from '@mathcode/mathjax-editor';
editorControl = new FormControl('', { nonNullable: true });

// component metadata
imports: [ReactiveFormsModule, MathEditorComponent]

// template
<app-math-editor [formControl]="editorControl"></app-math-editor>
```

Two‑way binding
```
content = '';
<app-math-editor [(value)]="content"></app-math-editor>
```

## Inputs / Outputs

- `@Input() value: string` — current editor content
- `@Output() valueChange: EventEmitter<string>` — emitted on user edits (enables `[(value)]`)
- ControlValueAccessor — works with `[formControl]`, `formControlName`, `[(ngModel)]`; supports disabled state

## Minimal example (standalone AppComponent)

```
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MathEditorComponent } from '@mathcode/mathjax-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h3>MathJax Editor</h3>
    <app-math-editor name="math" [(ngModel)]="content"></app-math-editor>
    <pre>{{ content }}</pre>
  `,
  imports: [FormsModule, MathEditorComponent]
})
class AppComponent { content = ''; }

bootstrapApplication(AppComponent, { providers: [importProvidersFrom(FormsModule)] });
```

## Notes

- Mode switch changes how preview is parsed; it does not convert syntax.
- AsciiMath prose: with the default MathJax v4 AsciiMath setup, `text("...")` is not supported. Plain words inside an AsciiMath expression are treated as math identifiers. If you need prose, keep it outside the editor, or switch to TeX mode and use `\text{...}` (with the appropriate TeX configuration).
- Centering: there is no built‑in “center:” prefix for AsciiMath lines. Use page layout/CSS to center the preview container, or prefer TeX display environments for centered equations.
