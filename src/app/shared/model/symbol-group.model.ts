export interface MathSymbol {
  name: string;
  symbol: string;
  code: string;
  offset: number;
}

export interface MathSymbolGroup {
  group: string;
  symbols: MathSymbol[];
}
