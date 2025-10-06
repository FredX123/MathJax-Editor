# MathJax Editor (Angular 19 workspace)

This workspace contains a reusable standalone library and a minimal demo app:

- Library: `projects/mathjax-editor` — a standalone Angular 19 component for editing and rendering math with MathJax (TeX, MathML, AsciiMath) published as `@mathcode/mathjax-editor`
- Demo app: `projects/demo-host` — hosts the library for manual testing

Refer to the library’s README for full install/usage docs: `projects/mathjax-editor/README.md`.

## Prerequisites

- Node.js LTS, npm
- Install dependencies: `npm install`

## Run the demo app

The demo app is configured to use the library directly in the workspace.

- `npm start` (or `ng serve demo-host`)
- Open http://localhost:4200

## Build the library

```
ng build mathjax-editor
```

Artifacts are emitted to `dist/mathjax-editor`.

## Use the library in your app (summary)

See `projects/mathjax-editor/README.md` for details. Quick start:

1) Add MathJax to your app (angular.json assets/scripts and index.html config)

2) Import and use the editor (standalone):

```
import { MathEditorComponent } from '@mathcode/mathjax-editor';

// template
<app-math-editor [(value)]="content"></app-math-editor>
```

Support includes Reactive Forms (`[formControl]`) and Template-driven (`[(ngModel)]`).

## Extending symbol groups

Host apps can provide additional/override groups via DI token:

```
import { MATHJAX_ADDITIONAL_GROUPS } from 'mathjax-editor';

providers: [
  { provide: MATHJAX_ADDITIONAL_GROUPS, useValue: { tex: [/* groups */], mathml: [], asciimath: [] } }
]
```

## Notes

- Mode switch changes how preview is parsed; it does not convert your text between syntaxes.
- AsciiMath prose must be wrapped with `text("...")`. You can prefix a line with `center:` to center it in preview.

## Project structure

- `projects/mathjax-editor` — library source and README
- `projects/demo-host` — demo application that imports the library
