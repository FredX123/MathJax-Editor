import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MathJaxDirective } from '../shared/directives/mathjax.directive';
import { MathSymbolsComponent } from '../math-symbols/math-symbols.component';
import { PaletteMode } from '../shared/data/math-palettes';

// Note: Removed default samples; content is now driven entirely by host inputs

@Component({
  selector: 'app-math-editor',
  standalone: true,
  templateUrl: './math-editor.component.html',
  styleUrls: ['./math-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MathJaxDirective, MathSymbolsComponent, ReactiveFormsModule, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MathEditorComponent),
      multi: true
    }
  ]
})
export class MathEditorComponent implements OnInit, ControlValueAccessor {

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

  private _value = '';
  private externalValueSet = false;
  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};
  isDisabled = false;

  @Input()
  get value(): string { return this._value; }
  set value(v: string) {
    const next = v ?? '';
    this.externalValueSet = true;
    this._value = next;
    this.editorContent?.setValue(next, { emitEvent: false });
    this.updateMathFromValue();
  }

  @Output() valueChange = new EventEmitter<string>();

  // Help dialog state and samples (for copy/paste)
  showHelp = false;
  readonly samples: Record<PaletteMode, string> = {
    tex: [
      '(a) What is the value of \\(\\sqrt{\\sqrt{81} + \\sqrt{9} - \\sqrt{64}}\\)?',
      '<br>',
      '(b) Determine all real numbers \\(x\\) for which \\(\\dfrac{1}{\\sqrt{x^{2}+7}}=\\dfrac{1}{4}\\).',
      '<br>',
      '(c) Determine all triples \\((x,y,z)\\) of real numbers that are solutions to the following system of equations:',
      '\\[',
      '\\begin{aligned}',
      '\\log_{9} x + \\log_{9} y + \\log_{3} z &= 2\\\\',
      '\\log_{16} x + \\log_{4} y + \\log_{16} z &= 1\\\\',
      '\\log_{5} x + \\log_{25} y + \\log_{25} z &= 0',
      '\\end{aligned}',
      '\\]'
    ].join('\n'),
    mathml: [
      '<math display="inline">',
      '  <mrow>',
      '    <mtext>(a) What is the value of </mtext>',
      '    <msqrt>',
      '      <mrow>',
      '        <msqrt><mn>81</mn></msqrt>',
      '        <mo>+</mo>',
      '        <msqrt><mn>9</mn></msqrt>',
      '        <mo>&#x2212;</mo>',
      '        <msqrt><mn>64</mn></msqrt>',
      '      </mrow>',
      '    </msqrt>',
      '    <mtext>?</mtext>',
      '  </mrow>',
      '</math>',
      '<br>',
      '<math display="inline">',
      '  <mrow>',
      '    <mtext>(b) Determine all real numbers </mtext>',
      '    <mi>x</mi>',
      '    <mtext> for which </mtext>',
      '    <mfrac>',
      '      <mn>1</mn>',
      '      <msqrt>',
      '        <mrow>',
      '          <msup><mi>x</mi><mn>2</mn></msup>',
      '          <mo>+</mo>',
      '          <mn>7</mn>',
      '        </mrow>',
      '      </msqrt>',
      '    </mfrac>',
      '    <mo>=</mo>',
      '    <mfrac><mn>1</mn><mn>4</mn></mfrac>',
      '    <mtext>.</mtext>',
      '  </mrow>',
      '</math>',
      '<br>',
      '<math display="inline">',
      '  <mrow>',
      '    <mtext>(c) Determine all triples (x, y, z) of real numbers that are solutions to the following system of equations: </mtext>',
      '  </mrow>',
      '</math>',
      '<br>',
      '<math display="block">',
      '  <mtable>',
      '    <mtr>',
      '      <mtd>',
      '        <mrow>',
      '          <msub><mi>log</mi><mn>9</mn></msub><mi>x</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>9</mn></msub><mi>y</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>3</mn></msub><mi>z</mi>',
      '          <mo>=</mo><mn>2</mn>',
      '        </mrow>',
      '      </mtd>',
      '    </mtr>',
      '    <mtr>',
      '      <mtd>',
      '        <mrow>',
      '          <msub><mi>log</mi><mn>16</mn></msub><mi>x</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>4</mn></msub><mi>y</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>16</mn></msub><mi>z</mi>',
      '          <mo>=</mo><mn>1</mn>',
      '        </mrow>',
      '      </mtd>',
      '    </mtr>',
      '    <mtr>',
      '      <mtd>',
      '        <mrow>',
      '          <msub><mi>log</mi><mn>5</mn></msub><mi>x</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>25</mn></msub><mi>y</mi>',
      '          <mo>+</mo>',
      '          <msub><mi>log</mi><mn>25</mn></msub><mi>z</mi>',
      '          <mo>=</mo><mn>0</mn>',
      '        </mrow>',
      '      </mtd>',
      '    </mtr>',
      '  </mtable>',
      '</math>'
    ].join('\n'),
    asciimath: [
      '`(b) What is the value of `  sqrt(sqrt(81)+sqrt(9)-sqrt(64)) ` ?`',
      '`(c) Determine all real numbers ` x  ` for which ` 1/sqrt(x^2+7) = 1/4 `.`',
      '`(c) Determine all triples (` x, y, z `) of real numbers that are solutions to the following system of equations:`',
      'log_9 x + log_9 y + log_3 z = 2',
      'log_16 x + log_4 y + log_16 z = 1',
      'log_5 x + log_25 y + log_25 z = 0'
    ].join('\n')
  };

  constructor() {
    this.mathForm = new FormGroup({
      editorContent: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.editorContent?.valueChanges.subscribe((val: string) => {
      this._value = val ?? '';
      this.updateMathFromValue();
      this._onChange(this._value);
      this.valueChange.emit(this._value);
    });

    // No default sample content — leave empty unless host sets a value
  }

  setMode(mode: PaletteMode): void {
    if (this.paletteMode === mode) {
      return;
    }
    // Clear previous rendered DOM to avoid leftover wrappers between modes
    this.renderedContent = '';
    this.paletteMode = mode;
    // Re-render with the same textarea content under the new parser
    this.updateMathFromValue();
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

    // updateMathFromValue is triggered by valueChanges, but call defensively
    this.updateMathFromValue();
    this.textarea.nativeElement.focus();
  }

  // Update MathJax-rendered content
  private updateMathFromValue() {
    const text = this._value ?? '';
    switch (this.paletteMode) {
      case 'tex':
      case 'mathml':
        this.renderedContent = text;
        break;
      case 'asciimath': {
        if (!text.trim()) {
          this.renderedContent = '';
          break;
        }
        // Heuristic: if content looks like TeX or MathML, don't try to feed it to AsciiMath
        // to avoid leaving the preview element in a bad state after parse errors.
        const looksLikeTex = /\\[a-zA-Z]|\$|\\\(|\\\)|\\\[|\\\]|\\begin\{|\\end\{/.test(text);
        const looksLikeMathMl = /<\s*math[\s>]/i.test(text);
        if (looksLikeTex || looksLikeMathMl) {
          this.renderedContent = '';
          break;
        }
        const lines = text.split('\n');
        const segments: string[] = [];
        for (const raw of lines) {
          const trimmed = (raw ?? '').trim();
          if (!trimmed) continue;
          segments.push(`\`${trimmed}\`<br>`);
        }
        this.renderedContent = segments.join('').replace(/(<br>)+$/, '');
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
        return '<math display="inline">•</math>';
      case 'asciimath':
        return '`•`';
      default:
        return null;
    }
  }

  private getBlockSnippet(): string | null {
    switch (this.paletteMode) {
      case 'tex':
        return '\\[\n•\n\\]';
      case 'mathml':
        return '<math display="block">\n<mi>•</mi>\n</math>';
      case 'asciimath':
        return '``\n•\n``';
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

  // CVA hooks
  writeValue(value: string | null): void {
    const next = value ?? '';
    this.externalValueSet = true;
    this._value = next;
    this.editorContent?.setValue(next, { emitEvent: false });
    this.updateMathFromValue();
  }

  registerOnChange(fn: (val: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleBlur(): void {
    this._onTouched();
  }

  openHelp(): void {
    this.showHelp = true;
  }

  closeHelp(): void {
    this.showHelp = false;
  }

  copySample(mode: PaletteMode): void {
    const text = this.samples[mode] ?? '';
    if (!text) { return; }
    if (navigator && 'clipboard' in navigator && (navigator as any).clipboard?.writeText) {
      (navigator as any).clipboard.writeText(text).catch(() => this.fallbackCopy(text));
    } else {
      this.fallbackCopy(text);
    }
  }

  private fallbackCopy(text: string) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch {
      // no-op
    }
  }
}
