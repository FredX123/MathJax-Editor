import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

const sample_input: string = 'The measure of a major arc is the difference between the measure of the related minor arc and the '
                          +  'measure of the entire circle ($360^{\\circ}$). For example, if the measure of the related minor arc '
                          +  'is $50^{\\circ}$, then the measure of the major arc will be $360^{\\circ} - 50^{\\circ} = 310^{\circ}$. '
                          +  'The measure of a semicircle is $180^{\\circ}$\n'
                          +  'A useful relation in many CS contexts ${\\pi}$ is that, for $n \\ge 0$, \n'
                          +  '$$\\sum_{i=0}^n i = \\frac{n(n+1)}{2}.$$ \n'
                          +  '$$\\frac{n(n+1)}{2}$$ \n'
                          +  '$\\pi$';

@Component({
  selector: 'app-math-editor',
  templateUrl: './math-editor.component.html',
  styleUrls: ['./math-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathEditorComponent implements OnInit {

  @ViewChild('editor', { static: true }) textarea!: ElementRef;
  @ViewChild('output', { static: true }) output!: ElementRef;

  mathForm: FormGroup;
  renderedContent: string = '';

  constructor() {
    this.mathForm = new FormGroup({
      editorContent: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.editorContent?.valueChanges.subscribe((value) => {
      this.updateMath();
    });

    this.editorContent?.setValue(sample_input);
  }

  insertSymbol(event: any): void {
    if (this.editorContent) {
      const textareaValue = this.editorContent.value || '';
      const cursorPos = this.textarea.nativeElement.selectionStart;
      const textBefore = textareaValue.substring(0, cursorPos);
      const textAfter = textareaValue.substring(cursorPos);

      // Insert the symbol at the cursor position
      const newText = textBefore + event.symbolCode + textAfter;
      this.editorContent.setValue(newText);

      // Calculate the new cursor position
      if (event.offset) {
        this.textarea.nativeElement.selectionStart = cursorPos + event.offset;
        this.textarea.nativeElement.selectionEnd = cursorPos + event.offset;
      } else {
        this.textarea.nativeElement.selectionStart = cursorPos + event.symbolCode.length;
        this.textarea.nativeElement.selectionEnd = cursorPos + event.symbolCode.length;
      }

      // Update the MathJax rendering
      this.updateMath();

      // Refocus the textarea after updating
      this.textarea.nativeElement.focus();
    }
  }

  // Update MathJax-rendered content
  updateMath() {
    const latexText = this.editorContent?.value || '';
    this.renderedContent = latexText.replace(/\n\n/g, '<br>');
  }

    // HostListener to listen for keydown events
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      // Check if Ctrl + I is pressed
      if (event.ctrlKey && event.key.toLowerCase() === 'i') {
        event.preventDefault(); // Prevent the default action
        this.insertSymbol({ symbolCode: '$$', offset: 1 });
      } else if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault(); // Prevent the default action
        this.insertSymbol({ symbolCode: '$$$$', offset: 2 });
      }
    }

  get f(): FormGroup {
    return this.mathForm as FormGroup;
  }

  get editorContent() {
    return this.f?.get('editorContent');
  }
}
