# mathjax-editor

Standalone Angular 19 math editor component powered by MathJax v4 (with optional v3 fallback). Supports TeX, MathML, and AsciiMath inputs and integrates with Angular forms or two-way binding patterns.

## Installation

Use your preferred package manager, for example:

pnpm add mathjax-editor @mathjax/src
pnpm add mathjax-full --save-peer   # optional

## Usage

### Standalone + Reactive Forms

Import the standalone component and bind it to an Angular FormControl.

### Template-driven / Two-way Binding

Bind with [(value)] to mirror the textarea content.

The editor implements ControlValueAccessor and exposes @Input(value) and @Output(valueChange) for flexible integration.

## Building

ng build mathjax-editor

Use the demo-host application for manual verification.
