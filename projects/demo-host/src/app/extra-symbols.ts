import { MathSymbolGroup } from 'mathjax-editor';
import { PaletteMode } from 'mathjax-editor';

export const EXTRA_SYMBOL_GROUPS: Record<PaletteMode, MathSymbolGroup[]> = {
  tex: [
    // {
    //   title: 'Greek (variants)',
    //   items: [
    //     { title: '\\varepsilon', preview: 'ε', snippet: '\\varepsilon' },
    //     { title: '\\varphi', preview: 'ϕ', snippet: '\\varphi' },
    //     { title: '\\varpi', preview: 'ϖ', snippet: '\\varpi' },
    //     { title: '\\varrho', preview: 'ϱ', snippet: '\\varrho' },
    //     { title: '\\varsigma', preview: 'ς', snippet: '\\varsigma' },
    //     { title: '\\vartheta', preview: 'ϑ', snippet: '\\vartheta' },
    //     { title: '\\Digamma', preview: 'Ϝ', snippet: '\\Digamma' },
    //     { title: '\\digamma', preview: 'ϝ', snippet: '\\digamma' }
    //   ]
    // }
  ],
  mathml: [],
  asciimath: []
};
