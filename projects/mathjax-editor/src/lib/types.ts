export type MathInputMode = 'tex' | 'mathml' | 'asciimath';

export interface MathEditorValueChange {
  value: string;
  mode: MathInputMode;
}
