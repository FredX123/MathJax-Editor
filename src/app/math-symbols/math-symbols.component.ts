import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MathSymbol, MathSymbolGroup } from '../shared/model/symbol-group.model';
import { NgFor, NgIf } from '@angular/common';
import { MATH_PALETTES, PaletteMode } from '../shared/data/math-palettes';

@Component({
    selector: 'app-math-symbols',
    templateUrl: './math-symbols.component.html',
    styleUrls: ['./math-symbols.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgFor, NgIf]
})
export class MathSymbolsComponent implements OnInit, OnChanges {

  @Output() symbolInserted = new EventEmitter<string>();
  @Input() mode: PaletteMode = 'tex';

  symbolGroups: MathSymbolGroup[] = [];
  currentTab: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.setPalette();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] && !changes['mode'].firstChange) {
      this.setPalette();
    }
  }

  insertSymbol(snippet: string) {
    this.symbolInserted.emit(snippet);
  }

  setCurrentTab(group: string): void {
    this.currentTab = group;
  }

  activateTab(event: MouseEvent | KeyboardEvent, group: string): void {
    if (event instanceof KeyboardEvent) {
      const key = event.key;
      if (key !== 'Enter' && key !== ' ' && key !== 'Space' && key !== 'Spacebar') {
        return;
      }
      event.preventDefault();
    }

    this.setCurrentTab(group);
  }

  get currentSymbols(): MathSymbol[] {
    const group = this.symbolGroups.find(g => g.title === this.currentTab);
    return group ? group.items : [];
  }

  private setPalette(): void {
    this.symbolGroups = MATH_PALETTES[this.mode] ?? [];
    this.currentTab = this.symbolGroups[0]?.title ?? '';
    this.cd.markForCheck();
  }

}
