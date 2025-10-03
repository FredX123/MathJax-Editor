import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MathJaxDirective } from '../shared/directives/mathjax.directive';
import { MathSymbolsComponent } from '../math-symbols/math-symbols.component';
import { PaletteMode } from '../shared/data/math-palettes';

const SAMPLE_TEX = `$$\\int_0^\\infty \\frac{x^3}{e^x-1}\\,dx = \\frac{\\pi^4}{15}$$`;

const SAMPLE_MATHML = `\
<math display="block">\
  <mrow>\
    <msubsup>\
      <mo>∫</mo>\
      <mn>0</mn>\
      <mo>∞</mo>\
    </msubsup>\
    <mfrac>\
      <msup><mi>x</mi><mn>3</mn></msup>\
      <mrow>\
        <msup><mi>e</mi><mi>x</mi></msup>\
        <mo>−</mo>\
        <mn>1</mn>\
      </mrow>\
    </mfrac>\
    <mo>d</mo><mi>x</mi>\
    <mo>=</mo>\
    <mfrac>\
      <msup><mi>π</mi><mn>4</mn></msup>\
      <mn>15</mn>\
    </mfrac>\
  </mrow>\
</math>\
`.trim();

const SAMPLE_ASCIIMATH = 'int_0^infty x^3/(e^x - 1) dx = (pi^4)/15';

const SAMPLE_BY_MODE: Record<PaletteMode, string> = {
  tex: SAMPLE_TEX,
  mathml: SAMPLE_MATHML,
  asciimath: SAMPLE_ASCIIMATH
};

@Component({
    selector: 'app-math-editor',
    templateUrl: './math-editor.component.html',
    styleUrls: ['./math-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MathJaxDirective, MathSymbolsComponent, ReactiveFormsModule, NgFor]
})
export class MathEditorComponent implements OnInit {

  @ViewChild('editor', { static: true }) textarea!: ElementRef;
  @ViewChild('output', { static: true }) output!: ElementRef;

  mathForm: FormGroup;
  renderedContent: string = '';
  paletteMode: PaletteMode = 'tex';
  readonly modes: Array<{ key: PaletteMode; label: string }> = [
    { key: 'tex', label: 'TeX' },
    { key: 'mathml', label: 'MathML' },
    { key: 'asciimath', label: 'AsciiMath' }
  ];

  constructor() {
    this.mathForm = new FormGroup({
      editorContent: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.editorContent?.valueChanges.subscribe((value) => {
      this.updateMath();
    });

    this.editorContent?.setValue(SAMPLE_BY_MODE[this.paletteMode]);
  }

  setMode(mode: PaletteMode): void {
    if (this.paletteMode === mode) {
      return;
    }
    this.paletteMode = mode;
    this.editorContent?.setValue(SAMPLE_BY_MODE[mode]);
  }

  insertSymbol(snippet: string): void {
    if (!this.editorContent) {
      return;
    }

    const textareaValue = this.editorContent.value || '';
    const cursorPos = this.textarea.nativeElement.selectionStart;
    const textBefore = textareaValue.substring(0, cursorPos);
    const textAfter = textareaValue.substring(cursorPos);

    const inserted = snippet;
    const updated = textBefore + inserted + textAfter;
    this.editorContent.setValue(updated);

    const bulletIndex = inserted.indexOf('•');
    const selectionStart = bulletIndex >= 0 ? cursorPos + bulletIndex : cursorPos + inserted.length;
    const selectionEnd = bulletIndex >= 0 ? selectionStart + 1 : selectionStart;

    this.textarea.nativeElement.selectionStart = selectionStart;
    this.textarea.nativeElement.selectionEnd = selectionEnd;

    this.updateMath();
    this.textarea.nativeElement.focus();
  }

  // Update MathJax-rendered content
  updateMath() {
    const text = this.editorContent?.value ?? '';

    switch (this.paletteMode) {
      case 'tex': {
        this.renderedContent = text;
        break;
      }
      case 'mathml': {
        this.renderedContent = text;
        break;
      }
      case 'asciimath': {
        if (!text.trim()) {
          this.renderedContent = '';
          break;
        }
        const lines = text.split('\n');
        const segments = lines.map((line: string) => {
          const trimmed = line.trim();
          return trimmed ? `\`${trimmed}\`` : '';
        });
        this.renderedContent = segments.join('<br>').replace(/(<br>)+$/, '');
        break;
      }
    }
  }

  // HostListener to listen for keydown events
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!event.ctrlKey) {
      return;
    }

    const key = event.key.toLowerCase();

    if (key === 'i') {
      const snippet = this.getInlineSnippet();
      if (snippet) {
        event.preventDefault();
        this.insertSymbol(snippet);
      }
    } else if (key === 'k') {
      const snippet = this.getBlockSnippet();
      if (snippet) {
        event.preventDefault();
        this.insertSymbol(snippet);
      }
    }
  }

  private getInlineSnippet(): string | null {
    switch (this.paletteMode) {
      case 'tex':
        return '\\(•\\)';
      case 'mathml':
        return '<math><mi>•</mi></math>';
      case 'asciimath':
        return '`•`';
      default:
        return null;
    }
  }

  private getBlockSnippet(): string | null {
    switch (this.paletteMode) {
      case 'tex':
        return '$$\n•\n$$';
      case 'mathml':
        return '<math display="block">\n  •\n</math>';
      case 'asciimath':
        return '`\n•\n`';
      default:
        return null;
    }
  }

  get f(): FormGroup {
    return this.mathForm as FormGroup;
  }

  get editorContent() {
    return this.f?.get('editorContent');
  }
}
