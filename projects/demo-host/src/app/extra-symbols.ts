import { MathSymbolGroup } from 'mathjax-editor';
import { PaletteMode } from 'mathjax-editor';

export const EXTRA_SYMBOL_GROUPS: Record<PaletteMode, MathSymbolGroup[]> = {
  tex: [
    {
      title: 'Greek (variants)',
      items: [
        { title: '\\varepsilon', preview: 'ε', snippet: '\\varepsilon' },
        { title: '\\varphi', preview: 'ϕ', snippet: '\\varphi' },
        { title: '\\varpi', preview: 'ϖ', snippet: '\\varpi' },
        { title: '\\varrho', preview: 'ϱ', snippet: '\\varrho' },
        { title: '\\varsigma', preview: 'ς', snippet: '\\varsigma' },
        { title: '\\vartheta', preview: 'ϑ', snippet: '\\vartheta' },
        { title: '\\Digamma', preview: 'Ϝ', snippet: '\\Digamma' },
        { title: '\\digamma', preview: 'ϝ', snippet: '\\digamma' }
      ]
    },
    {
      title: 'Arrows (extended)',
      items: [
        { title: '\\uparrow', preview: '↑', snippet: '\\uparrow' },
        { title: '\\downarrow', preview: '↓', snippet: '\\downarrow' },
        { title: '\\updownarrow', preview: '↕', snippet: '\\updownarrow' },
        { title: '\\Uparrow', preview: '⇑', snippet: '\\Uparrow' },
        { title: '\\Downarrow', preview: '⇓', snippet: '\\Downarrow' },
        { title: '\\Updownarrow', preview: '⇕', snippet: '\\Updownarrow' },
        { title: '\\mapsto', preview: '↦', snippet: '\\mapsto' },
        { title: '\\longrightarrow', preview: '⟶', snippet: '\\longrightarrow' },
        { title: '\\longleftarrow', preview: '⟵', snippet: '\\longleftarrow' },
        { title: '\\Longrightarrow', preview: '⟹', snippet: '\\Longrightarrow' },
        { title: '\\Longleftarrow', preview: '⟸', snippet: '\\Longleftarrow' },
        { title: '\\leftrightsquigarrow', preview: '↭', snippet: '\\leftrightsquigarrow' },
        { title: '\\implies', preview: '⇒', snippet: '\\implies' },
        { title: '\\iff', preview: '⇔', snippet: '\\iff' }
      ]
    },
    {
      title: 'Set theory (extended)',
      items: [
        { title: '\\subsetneq', preview: '⊊', snippet: '\\subsetneq' },
        { title: '\\supsetneq', preview: '⊋', snippet: '\\supsetneq' },
        { title: '\\subsetneqq', preview: '⫋', snippet: '\\subsetneqq' },
        { title: '\\supsetneqq', preview: '⫌', snippet: '\\supsetneqq' },
        { title: '\\nsubseteq', preview: '⊈', snippet: '\\nsubseteq' },
        { title: '\\nsupseteq', preview: '⊉', snippet: '\\nsupseteq' },
        { title: '\\sqsubset', preview: '⊏', snippet: '\\sqsubset' },
        { title: '\\sqsupset', preview: '⊐', snippet: '\\sqsupset' },
        { title: '\\sqsubseteq', preview: '⊑', snippet: '\\sqsubseteq' },
        { title: '\\sqsupseteq', preview: '⊒', snippet: '\\sqsupseteq' }
      ]
    },
    {
      title: 'Operators (big)',
      items: [
        { title: '\\bigcup', preview: '⋃', snippet: '\\bigcup' },
        { title: '\\bigcap', preview: '⋂', snippet: '\\bigcap' },
        { title: '\\bigsqcup', preview: '⋈', snippet: '\\bigsqcup' },
        { title: '\\coprod', preview: '∐', snippet: '\\coprod' },
        { title: '\\bigvee', preview: '⋁', snippet: '\\bigvee' },
        { title: '\\bigwedge', preview: '⋀', snippet: '\\bigwedge' },
        { title: '\\bigodot', preview: '⊙', snippet: '\\bigodot' },
        { title: '\\bigotimes', preview: '⊗', snippet: '\\bigotimes' },
        { title: '\\bigoplus', preview: '⊕', snippet: '\\bigoplus' }
      ]
    },
    {
      title: 'Accents (wide)',
      items: [
        { title: '\\overline{•}', preview: 'x̄', snippet: '\\overline{•}' },
        { title: '\\underline{•}', preview: 'x̲', snippet: '\\underline{•}' },
        { title: '\\vec{•}', preview: '→x', snippet: '\\vec{•}' },
        { title: '\\overbrace{•}^{•}', preview: '⏞', snippet: '\\overbrace{•}^{•}' },
        { title: '\\underbrace{•}_{•}', preview: '⏟', snippet: '\\underbrace{•}_{•}' }
      ]
    },
    {
      title: 'Fonts (letters)',
      items: [
        { title: '\\mathbb{R}', preview: 'ℝ', snippet: '\\mathbb{R}' },
        { title: '\\mathbb{N}', preview: 'ℕ', snippet: '\\mathbb{N}' },
        { title: '\\mathbb{Q}', preview: 'ℚ', snippet: '\\mathbb{Q}' },
        { title: '\\mathfrak{g}', preview: '𝔤', snippet: '\\mathfrak{g}' },
        { title: '\\mathrm{d}', preview: 'd', snippet: '\\mathrm{d}' },
        { title: '\\mathsf{A}', preview: 'A', snippet: '\\mathsf{A}' }
      ]
    },
    {
      title: 'Misc',
      items: [
        { title: '\\binom{•}{•}', preview: '() over ()', snippet: '\\binom{•}{•}' },
        { title: '\\ceil{•}', preview: '⌈•⌉', snippet: '\\left\\lceil • \\right\\rceil' },
        { title: '\\floor{•}', preview: '⌊•⌋', snippet: '\\left\\lfloor • \\right\\rfloor' },
        { title: '\\Re', preview: 'ℜ', snippet: '\\Re' },
        { title: '\\Im', preview: 'ℑ', snippet: '\\Im' },
        { title: '\\operatorname{•}', preview: 'op(•)', snippet: '\\operatorname{•}' }
      ]
    }
  ],
  mathml: [],
  asciimath: []
};
