# mathjax-editor (Angular 19 standalone library)

Reusable, standalone Angular components for editing and rendering math with MathJax (TeX, MathML, AsciiMath).

## Install

Add dependencies to your app:

```
npm i mathjax
```

Add MathJax to your build (Angular CLI):

- `angular.json` (application project):

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

Configure MathJax in `src/index.html` before the script runs:

```
<script>
  window.MathJax = {
    loader: { load: ['input/tex', 'input/mml', 'input/asciimath'] },
    tex: { inlineMath: [['\\(', '\\)'], ['$', '$']], displayMath: [['\\[', '\\]'], ['$$', '$$']], processEscapes: true },
    asciimath: { delimiters: [['`','`']] },
    svg: { fontCache: 'global' },
    startup: { typeset: false }
  };
  // MathJax script is loaded by angular.json scripts
</script>
```

## Usage

All components are standalone. Import and use directly in any component.

```
import { MathEditorComponent } from 'mathjax-editor';
```

### Two-way binding

```
// component.ts
content = '';

// template
<app-math-editor [(value)]="content"></app-math-editor>
```

### Reactive Forms

```
// component.ts
import { FormControl, ReactiveFormsModule } from '@angular/forms';
editorControl = new FormControl('', { nonNullable: true });

// component metadata
imports: [ReactiveFormsModule, MathEditorComponent]

// template
<app-math-editor [formControl]="editorControl"></app-math-editor>
```

### Template-driven (ngModel)

```
// component.ts
import { FormsModule } from '@angular/forms';
content = '';

// component metadata
imports: [FormsModule, MathEditorComponent]

// template
<app-math-editor name="math" [(ngModel)]="content"></app-math-editor>
```

## Symbol palette

- Tabs group symbols; search filters across all groups.
- Click to insert at cursor. Snippets may include a placeholder bullet `•` — type over it.
- Keyboard shortcuts: `Ctrl+I` inserts an inline snippet; `Ctrl+K` inserts a block snippet.

## Modes

- TeX / MathML / AsciiMath supported. Switching mode changes how the preview is parsed; it does not convert your text.
- AsciiMath specifics:
  - Plain prose must be wrapped with `text("...")`.
  - Start a line with `center:` to render that line centered in preview.

## Extending symbol groups

Provide additional or override groups using the injection token:

```
import { MATHJAX_ADDITIONAL_GROUPS } from 'mathjax-editor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: MATHJAX_ADDITIONAL_GROUPS, useValue: { tex: [/* groups */], mathml: [], asciimath: [] } }
  ]
});
```

## API

`<app-math-editor>`

- Inputs/Outputs
  - `@Input() value: string`
  - `@Output() valueChange: EventEmitter<string>` (enables `[(value)]`)
- Forms
  - Implements ControlValueAccessor (`[formControl]`, `formControlName`, `[(ngModel)]`)
  - Supports disabled state

## Notes

- Requires Angular 19+.
- `mathjax` is a peer runtime dependency; configure it as shown above.

