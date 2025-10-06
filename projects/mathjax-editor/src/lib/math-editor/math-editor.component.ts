import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MathJaxDirective } from '../shared/directives/mathjax.directive';
import { MathSymbolsComponent } from '../math-symbols/math-symbols.component';
import { PaletteMode } from '../shared/data/math-palettes';
import { HELP_SAMPLES } from '../shared/data/help-samples';

// Note: Removed default samples; content is now driven entirely by host inputs

@Component({
  selector: 'app-math-editor',
  standalone: true,
  templateUrl: './math-editor.component.html',
  styleUrls: ['./math-editor.component.scss'],
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

  // Help dialog state (samples moved to HELP_SAMPLES)
  showHelp = false;

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
          if (/^center:\s*/i.test(trimmed)) {
            const expr = trimmed.replace(/^center:\s*/i, '');
            segments.push(`<div class="am-center">\`${expr}\`</div>`);
          } else {
            segments.push(`\`${trimmed}\`<br>`);
          }
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
    const text = HELP_SAMPLES[mode] ?? '';
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

  // Build a rendered preview for the help dialog based on TeX sample
  get helpPreviewContent(): string {
    // Always render the TeX sample in the help dialog
    return HELP_SAMPLES.tex ?? '';
  }
}
