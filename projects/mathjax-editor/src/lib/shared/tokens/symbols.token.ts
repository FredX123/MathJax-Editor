import { InjectionToken } from '@angular/core';
import { MathSymbolGroup } from '../model/symbol-group.model';
import { PaletteMode } from '../data/math-palettes';

export const MATHJAX_ADDITIONAL_GROUPS = new InjectionToken<Record<PaletteMode, MathSymbolGroup[]>>(
  'MATHJAX_ADDITIONAL_GROUPS',
  { factory: () => ({}) as Record<PaletteMode, MathSymbolGroup[]> }
);

