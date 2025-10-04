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
  readonly helpSamples: Record<PaletteMode, string> = {
    tex: `$$\\int_0^\\infty \\frac{x^3}{e^x-1}\\,dx = \\frac{\\pi^4}{15}$$`,
    mathml: (
      `<math display="block">\n` +
      `  <mrow>\n` +
      `    <msubsup>\n` +
      `      <mo>∫</mo>\n` +
      `      <mn>0</mn>\n` +
      `      <mo>∞</mo>\n` +
      `    </msubsup>\n` +
      `    <mfrac>\n` +
      `      <msup><mi>x</mi><mn>3</mn></msup>\n` +
      `      <mrow>\n` +
      `        <msup><mi>e</mi><mi>x</mi></msup>\n` +
      `        <mo>−</mo>\n` +
      `        <mn>1</mn>\n` +
      `      </mrow>\n` +
      `    </mfrac>\n` +
      `    <mo>d</mo><mi>x</mi>\n` +
      `    <mo>=</mo>\n` +
      `    <mfrac>\n` +
      `      <msup><mi>π</mi><mn>4</mn></msup>\n` +
      `      <mn>15</mn>\n` +
      `    </mfrac>\n` +
      `  </mrow>\n` +
      `</math>`
    ),
    asciimath: 'int_0^infty x^3/(e^x - 1) dx = (pi^4)/15'
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
    this.paletteMode = mode;
    // Do not overwrite user content when switching modes
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
        return '$•$';
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
    const text = this.helpSamples[mode] ?? '';
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
