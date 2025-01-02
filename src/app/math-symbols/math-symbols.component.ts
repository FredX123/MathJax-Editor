import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MathSymbol, MathSymbolGroup } from '../shared/model/symbol-group.model';

@Component({
  selector: 'app-math-symbols',
  templateUrl: './math-symbols.component.html',
  styleUrls: ['./math-symbols.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathSymbolsComponent implements OnInit {

  @Output() symbolInserted = new EventEmitter<any>();

  symbolGroups: MathSymbolGroup[] = [];
  currentTab: string = ''; // Track the current tab

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSymbolGroups();
  }

  loadSymbolGroups() {
    this.http.get<MathSymbolGroup[]>('/assets/math-symbol-mapping.json').subscribe(data => {
      this.symbolGroups = data;
      this.currentTab = this.symbolGroups[0].group;
      this.cd.markForCheck();
    });
  }

  insertSymbol(symbolCode: string, offset?: number) {
    this.symbolInserted.emit({symbolCode: symbolCode, offset: offset});
  }

  setCurrentTab(group: string) {
    this.currentTab = group;
  }

  get currentSymbols(): MathSymbol[] {
    const group = this.symbolGroups.find(g => g.group === this.currentTab);
    return group ? group.symbols : [];
  }

}
