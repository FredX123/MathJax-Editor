export interface MathSymbol {
  title: string;
  preview: string;
  snippet: string;
}

export interface MathSymbolGroup {
  title: string;
  items: MathSymbol[];
}

