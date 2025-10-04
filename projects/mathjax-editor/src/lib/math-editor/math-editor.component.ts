import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MathJaxDirective } from '../mathjax.directive';
import { MathSymbolsComponent } from '../math-symbols/math-symbols.component';
import { MATH_PALETTES, SAMPLE_EXPRESSIONS } from '../data/math-palettes';
import { MathInputMode } from '../types';

@Component({
    selector: 'mathjax-editor',
    templateUrl: './math-editor.component.html',
    styleUrls: ['./math-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MathJaxDirective, MathSymbolsComponent, ReactiveFormsModule, NgFor],
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

  renderedContent: string = '';
  private modeInput: MathInputMode | null = null;
  @Input()
  set value(val: string | null) {
    if (val === null || val === undefined) {
      return;
    }
    this.setEditorValue(val, false);
  }

  @Output() valueChange = new EventEmitter<string>();

  paletteMode: MathInputMode = 'tex';
  readonly modes: Array<{ key: MathInputMode; label: string }> = [
    { key: 'tex', label: 'TeX' },
    { key: 'mathml', label: 'MathML' },
    { key: 'asciimath', label: 'AsciiMath' }
  ];
  readonly editorControl = new FormControl<string>('', { nonNullable: true });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private isSettingFromExternal = false;

  ngOnInit(): void {
    this.editorControl.valueChanges.subscribe(value => {
      if (this.isSettingFromExternal) {
        return;
      }
      const next = value ?? '';
      this.updateMath(next);
      this.valueChange.emit(next);
      this.onChange(next);
    });

    const initialMode = this.modeInput ?? this.paletteMode;
    this.setMode(initialMode, false);
  }

  @Input()
  set mode(value: MathInputMode | null) {
    if (!value || value === this.paletteMode) {
      return;
    }
    this.modeInput = value;
    this.setMode(value, false);
  }

  get mode(): MathInputMode {
    return this.paletteMode;
  }

  setMode(mode: MathInputMode, emit = true): void {
    if (this.paletteMode === mode) {
      return;
    }
    if (emit) {
      this.modeInput = mode;
    }
    this.paletteMode = mode;
    this.setEditorValue(SAMPLE_EXPRESSIONS[mode], emit);
  }

  insertSymbol(snippet: string): void {
    const textareaValue = this.editorControl.value || '';
    const cursorPos = this.textarea.nativeElement.selectionStart;
    const textBefore = textareaValue.substring(0, cursorPos);
    const textAfter = textareaValue.substring(cursorPos);

    const inserted = snippet;
    const updated = textBefore + inserted + textAfter;
    this.setEditorValue(updated, true);

    const bulletIndex = inserted.indexOf('•');
    const selectionStart = bulletIndex >= 0 ? cursorPos + bulletIndex : cursorPos + inserted.length;
    const selectionEnd = bulletIndex >= 0 ? selectionStart + 1 : selectionStart;

    this.textarea.nativeElement.selectionStart = selectionStart;
    this.textarea.nativeElement.selectionEnd = selectionEnd;

    this.updateMath();
    this.textarea.nativeElement.focus();
  }

  // Update MathJax-rendered content
  updateMath(value?: string) {
    const text = value ?? this.editorControl.value ?? '';
    const trimmed = text.trim();

    if (!trimmed) {
      this.renderedContent = '';
      return;
    }

    switch (this.paletteMode) {
      case 'tex': {
        this.renderedContent = this.ensureTexDelimiters(trimmed);
        break;
      }
      case 'mathml': {
        this.renderedContent = trimmed;
        break;
      }
      case 'asciimath': {
        this.renderedContent = this.ensureAsciiDelimiters(trimmed);
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

  private buildTeXMarkup(value: string): string {
    const blocks = value.split(/\n{2,}/).filter(block => block.trim().length);
    const scripts = blocks.map(block => {
      const trimmed = block.trim();
      let content = trimmed;
      let type = 'math/tex; mode=display';

      if (/^\$\$(.*)\$\$$/s.test(trimmed)) {
        content = trimmed.replace(/^\$\$/s, '').replace(/\$\$$/s, '');
      } else if (/^\$(.*)\$/s.test(trimmed)) {
        content = trimmed.replace(/^\$/s, '').replace(/\$/s, '');
        type = 'math/tex';
      } else if (/^\\\[(.*)\\\]$/s.test(trimmed)) {
        content = trimmed.replace(/^\\\[/s, '').replace(/\\\]$/s, '');
      } else if (/^\\\((.*)\\\)$/s.test(trimmed)) {
        content = trimmed.replace(/^\\\(/s, '').replace(/\\\)$/s, '');
        type = 'math/tex';
      }

      return `<script type="${type}">${content}</script>`;
    });

    return scripts.join('<br>');
  }

  private buildAsciiMarkup(value: string): string {
    const lines = value.split(/\n+/).map(line => line.trim()).filter(Boolean);
    const scripts = lines.map(line => {
      const normalized = line.replace(/^`/, '').replace(/`$/, '');
      return `<script type="math/asciimath">${normalized}</script>`;
    });
    return scripts.join('<br>');
  }

  private ensureTexDelimiters(value: string): string {
    if (!value) {
      return '';
    }
    const hasDelims = /(\\\(|\\\[|\$\$|(^|[^\\])\$)/.test(value);
    if (hasDelims) {
      return value;
    }
    if (value.includes('\n')) {
      return `$$\n${value}\n$$`;
    }
    return `$${value}$`;
  }

  private ensureAsciiDelimiters(value: string): string {
    if (!value) {
      return '';
    }
    if (value.includes('`')) {
      return value;
    }
    const lines = value.split(/\n+/).map(s => s.trim()).filter(Boolean);
    if (lines.length <= 1) {
      return `\`${value}\``;
    }
    return lines.map(l => `\`${l}\``).join('\n');
  }

  writeValue(value: string | null): void {
    this.setEditorValue(value ?? '', false);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.editorControl.disable({ emitEvent: false });
    } else {
      this.editorControl.enable({ emitEvent: false });
    }
  }

  private setEditorValue(value: string, emit: boolean): void {
    this.isSettingFromExternal = !emit;
    this.editorControl.setValue(value, { emitEvent: emit });
    if (!emit) {
      this.updateMath(value);
    }
    this.isSettingFromExternal = false;
  }

  onBlur(): void {
    this.onTouched();
  }
}
