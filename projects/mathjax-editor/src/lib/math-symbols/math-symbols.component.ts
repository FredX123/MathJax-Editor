import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { MathSymbol, MathSymbolGroup } from '../shared/model/symbol-group.model';
import { NgFor, NgIf } from '@angular/common';
import { MATH_PALETTES, PaletteMode } from '../shared/data/math-palettes';
import { MATHJAX_ADDITIONAL_GROUPS } from '../shared/tokens/symbols.token';

@Component({
  selector: 'app-math-symbols',
  standalone: true,
  templateUrl: './math-symbols.component.html',
  styleUrls: ['./math-symbols.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgIf]
})
export class MathSymbolsComponent implements OnInit, OnChanges {

  @Output() symbolInserted = new EventEmitter<string>();
  @Input() mode: PaletteMode = 'tex';

  symbolGroups: MathSymbolGroup[] = [];
  currentTab: string = '';
  searchTerm = '';

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
    this.cd.markForCheck();
  }

  activateTab(event: MouseEvent | KeyboardEvent, group: string): void {
    if (event instanceof KeyboardEvent) {
      const key = event.key;
      if (key !== 'Enter' && key !== ' ' && key !== 'Space' && key !== 'Spacebar') {
        return;
      }
      event.preventDefault();
    }
    // Best practice: when switching groups, clear an active cross-group search
    if (this.searchTerm) {
      this.clearSearch();
    }
    this.setCurrentTab(group);
  }

  get currentSymbols(): MathSymbol[] {
    const q = this.searchTerm.trim();
    if (q) {
      return this.searchResults;
    }
    const group = this.symbolGroups.find(g => g.title === this.currentTab);
    return group ? group.items : [];
  }

  private additional = inject(MATHJAX_ADDITIONAL_GROUPS, { optional: true }) as (Record<PaletteMode, MathSymbolGroup[]> | null);

  private setPalette(): void {
    const extras = this.additional ?? ({} as Record<PaletteMode, MathSymbolGroup[]>);
    const extraGroups = extras[this.mode] ?? [];
    this.symbolGroups = [
      ...(MATH_PALETTES[this.mode] ?? []),
      ...extraGroups
    ];
    // default to first group
    this.currentTab = this.currentTab || (this.symbolGroups[0]?.title ?? '');
    this.cd.markForCheck();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.cd.markForCheck();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.cd.markForCheck();
  }

  private get searchResults(): MathSymbol[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return [];
    const all = this.symbolGroups.flatMap(g => g.items);
    const seen = new Set<string>();
    const out: MathSymbol[] = [];
    for (const s of all) {
      const key = `${s.title}|${s.snippet}|${s.preview}`;
      if (seen.has(key)) continue;
      const hay = `${s.title} ${s.preview} ${s.snippet}`.toLowerCase();
      if (hay.includes(q)) {
        out.push(s);
        seen.add(key);
      }
      if (out.length >= 300) break; // cap to avoid rendering too many
    }
    return out;
  }
}
