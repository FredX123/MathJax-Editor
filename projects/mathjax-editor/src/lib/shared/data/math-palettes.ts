import { MathSymbolGroup } from '../model/symbol-group.model';

export type PaletteMode = 'tex' | 'mathml' | 'asciimath';

const greekLowercase = [
  ['alpha', 'α'],
  ['beta', 'β'],
  ['gamma', 'γ'],
  ['delta', 'δ'],
  ['epsilon', 'ε'],
  ['zeta', 'ζ'],
  ['eta', 'η'],
  ['theta', 'θ'],
  ['iota', 'ι'],
  ['kappa', 'κ'],
  ['lambda', 'λ'],
  ['mu', 'μ'],
  ['nu', 'ν'],
  ['xi', 'ξ'],
  ['omicron', 'ο'],
  ['pi', 'π'],
  ['rho', 'ρ'],
  ['sigma', 'σ'],
  ['tau', 'τ'],
  ['upsilon', 'υ'],
  ['phi', 'φ'],
  ['chi', 'χ'],
  ['psi', 'ψ'],
  ['omega', 'ω']
] as const;

const greekUppercase = [
  ['Alpha', 'Α'],
  ['Beta', 'Β'],
  ['Gamma', 'Γ'],
  ['Delta', 'Δ'],
  ['Epsilon', 'Ε'],
  ['Zeta', 'Ζ'],
  ['Eta', 'Η'],
  ['Theta', 'Θ'],
  ['Iota', 'Ι'],
  ['Kappa', 'Κ'],
  ['Lambda', 'Λ'],
  ['Mu', 'Μ'],
  ['Nu', 'Ν'],
  ['Xi', 'Ξ'],
  ['Omicron', 'Ο'],
  ['Pi', 'Π'],
  ['Rho', 'Ρ'],
  ['Sigma', 'Σ'],
  ['Tau', 'Τ'],
  ['Upsilon', 'Υ'],
  ['Phi', 'Φ'],
  ['Chi', 'Χ'],
  ['Psi', 'Ψ'],
  ['Omega', 'Ω']
] as const;

const createTexGreek = (entries: ReadonlyArray<readonly [string, string]>) =>
  entries.map(([name, glyph]) => {
    const command = `\\${name}`;
    return {
      title: command,
      preview: glyph,
      snippet: command
    };
  });

const TEX_GROUPS: MathSymbolGroup[] = [
  {
    title: 'Greek (lowercase)',
    items: createTexGreek(greekLowercase)
  },
  {
    title: 'Greek (uppercase)',
    items: createTexGreek(greekUppercase)
  },
  {
    title: 'Operators',
    items: [
      { title: '+', preview: '+', snippet: '+' },
      { title: '−', preview: '−', snippet: '\-' },
      { title: '\\times', preview: '×', snippet: '\\times' },
      { title: '\\div', preview: '÷', snippet: '\\div' },
      { title: '\\cdot', preview: '·', snippet: '\\cdot' },
      { title: '\\pm', preview: '±', snippet: '\\pm' },
      { title: '\\mp', preview: '∓', snippet: '\\mp' }
    ]
  },
  {
    title: 'Relations',
    items: [
      { title: '=', preview: '=', snippet: '=' },
      { title: '\\neq', preview: '≠', snippet: '\\neq' },
      { title: '\\approx', preview: '≈', snippet: '\\approx' },
      { title: '\\leq', preview: '≤', snippet: '\\leq' },
      { title: '\\geq', preview: '≥', snippet: '\\geq' }
    ]
  },
  {
    title: 'Arrows',
    items: [
      { title: '\\to', preview: '→', snippet: '\\to' },
      { title: '\\leftarrow', preview: '←', snippet: '\\leftarrow' },
      { title: '\\Rightarrow', preview: '⇒', snippet: '\\Rightarrow' },
      { title: '\\Leftarrow', preview: '⇐', snippet: '\\Leftarrow' },
      { title: '\\leftrightarrow', preview: '↔', snippet: '\\leftrightarrow' }
    ]
  },
  {
    title: 'Accents',
    items: [
      { title: '\\hat{•}', preview: 'ŷ', snippet: '\\hat{•}' },
      { title: '\\bar{•}', preview: 'x̄', snippet: '\\bar{•}' },
      { title: '\\tilde{•}', preview: 'ã', snippet: '\\tilde{•}' }
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
    title: 'Delimiters',
    items: [
      { title: '( )', preview: '(•)', snippet: '\\left( • \\right)' },
      { title: '[ ]', preview: '[•]', snippet: '\\left[ • \\right]' },
      { title: '{ }', preview: '{•}', snippet: '\\left\\{ • \\right\\}' },
      { title: '〈 〉', preview: '〈•〉', snippet: '\\left\\langle • \\right\\rangle' }
    ]
  },
  {
    title: 'Exponents & Roots',
    items: [
      { title: 'Superscript', preview: 'x^{•}', snippet: 'x^{•}' },
      { title: 'Subscript', preview: 'x_{•}', snippet: 'x_{•}' },
      { title: 'Power', preview: '•^{•}', snippet: '•^{•}' },
      { title: 'Square Root', preview: '√•', snippet: '\\sqrt{•}' },
      { title: 'Nth Root', preview: '√[•]{•}', snippet: '\\sqrt[•]{•}' }
    ]
  },
  {
    title: 'Matrices',
    items: [
      { title: '2×2 Matrix', preview: '[• •; • •]', snippet: '\\begin{bmatrix}• & • \\\\ • & • \\end{bmatrix}' },
      { title: '3×3 Matrix', preview: '[• • •; • • •; • • •]', snippet: '\\begin{bmatrix}• & • & • \\\\ • & • & • \\\\ • & • & • \\end{bmatrix}' }
    ]
  },
  {
    title: 'Calculus',
    items: [
      { title: 'Integral', preview: '∫', snippet: '\\int_{•}^{•} • \\, d•' },
      { title: 'Sum', preview: '∑', snippet: '\\sum_{i=•}^{•} •' },
      { title: 'Product', preview: '∏', snippet: '\\prod_{•}^{•} •' },
      { title: 'Limit', preview: 'lim', snippet: '\\lim_{• \\to •} •' },
      { title: 'Partial', preview: '∂', snippet: '\\partial' },
      { title: 'Nabla', preview: '∇', snippet: '\\nabla' }
    ]
  },
  {
    title: 'Logic',
    items: [
      { title: '\\lnot', preview: '¬', snippet: '\\lnot' },
      { title: '\\land', preview: '∧', snippet: '\\land' },
      { title: '\\lor', preview: '∨', snippet: '\\lor' },
      { title: '\\implies', preview: '⇒', snippet: '\\implies' },
      { title: '\\iff', preview: '⇔', snippet: '\\iff' }
    ]
  },
  {
    title: 'Set Theory',
    items: [
      { title: '\\in', preview: '∈', snippet: '\\in' },
      { title: '\\notin', preview: '∉', snippet: '\\notin' },
      { title: '\\subset', preview: '⊂', snippet: '\\subset' },
      { title: '\\subseteq', preview: '⊆', snippet: '\\subseteq' },
      { title: '\\cup', preview: '∪', snippet: '\\cup' },
      { title: '\\cap', preview: '∩', snippet: '\\cap' }
    ]
  },
  {
    title: 'Geometry',
    items: [
      { title: '\\angle', preview: '∠', snippet: '\\angle' },
      { title: '\\perp', preview: '⟂', snippet: '\\perp' },
      { title: '\\parallel', preview: '∥', snippet: '\\parallel' }
    ]
  },
  {
    title: 'Text Styles',
    items: [
      { title: '\\mathbb{•}', preview: 'ℤ', snippet: '\\mathbb{•}' },
      { title: '\\mathbf{•}', preview: '𝐱', snippet: '\\mathbf{•}' },
      { title: '\\mathcal{•}', preview: '𝒞', snippet: '\\mathcal{•}' }
    ]
  },
  {
    title: 'Spacing',
    items: [
      { title: '\\,', preview: '\\,', snippet: '\\,' },
      { title: '\\;', preview: '\\;', snippet: '\\;' },
      { title: '\\!', preview: '\\!', snippet: '\\!' },
      { title: '\\quad', preview: '\\quad', snippet: '\\quad' }
    ]
  },
  // Extended groups migrated from demo-host extras
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
];

const createMathMlGreek = (entries: ReadonlyArray<readonly [string, string]>) =>
  entries.map(([name, glyph]) => ({
    title: name,
    preview: glyph,
    snippet: `<mi>${glyph}</mi>`
  }));

const MATHML_GROUPS: MathSymbolGroup[] = [
  {
    title: 'Greek (lowercase)',
    items: createMathMlGreek(greekLowercase)
  },
  {
    title: 'Greek (uppercase)',
    items: createMathMlGreek(greekUppercase)
  },
  {
    title: 'Operators',
    items: [
      { title: '+', preview: '+', snippet: '<mo>+</mo>' },
      { title: '−', preview: '−', snippet: '<mo>−</mo>' },
      { title: '×', preview: '×', snippet: '<mo>×</mo>' },
      { title: '÷', preview: '÷', snippet: '<mo>÷</mo>' },
      { title: '·', preview: '·', snippet: '<mo>·</mo>' },
      { title: '±', preview: '±', snippet: '<mo>±</mo>' },
      { title: '∓', preview: '∓', snippet: '<mo>∓</mo>' }
    ]
  },
  {
    title: 'Relations',
    items: [
      { title: '=', preview: '=', snippet: '<mo>=</mo>' },
      { title: '≠', preview: '≠', snippet: '<mo>≠</mo>' },
      { title: '≈', preview: '≈', snippet: '<mo>≈</mo>' },
      { title: '≤', preview: '≤', snippet: '<mo>≤</mo>' },
      { title: '≥', preview: '≥', snippet: '<mo>≥</mo>' }
    ]
  },
  {
    title: 'Arrows',
    items: [
      { title: '→', preview: '→', snippet: '<mo>→</mo>' },
      { title: '←', preview: '←', snippet: '<mo>←</mo>' },
      { title: '⇒', preview: '⇒', snippet: '<mo>⇒</mo>' },
      { title: '⇐', preview: '⇐', snippet: '<mo>⇐</mo>' },
      { title: '↔', preview: '↔', snippet: '<mo>↔</mo>' }
    ]
  },
  {
    title: 'Accents',
    items: [
      { title: 'hat', preview: 'ŷ', snippet: '<mover><mi>•</mi><mo>^</mo></mover>' },
      { title: 'bar', preview: 'x̄', snippet: '<mover><mi>•</mi><mo>¯</mo></mover>' },
      { title: 'tilde', preview: 'ã', snippet: '<mover><mi>•</mi><mo>˜</mo></mover>' }
    ]
  },
  {
    title: 'Accents (wide)',
    items: [
      { title: 'overline(•)', preview: 'x̄', snippet: '<mover accent="true"><mrow>•</mrow><mo>‾</mo></mover>' },
      { title: 'underline(•)', preview: 'x̲', snippet: '<munder accentunder="true"><mrow>•</mrow><mo>‾</mo></munder>' },
      { title: 'vec(•)', preview: '→x', snippet: '<mover><mi>•</mi><mo>→</mo></mover>' },
      { title: 'overbrace(•)', preview: '⏞', snippet: '<mover accent="true"><mrow>•</mrow><mo>⏞</mo></mover>' },
      { title: 'underbrace(•)', preview: '⏟', snippet: '<munder accentunder="true"><mrow>•</mrow><mo>⏟</mo></munder>' }
    ]
  },
  {
    title: 'Delimiters',
    items: [
      { title: '( )', preview: '(•)', snippet: '<mfenced><mi>•</mi></mfenced>' },
      { title: '[ ]', preview: '[•]', snippet: '<mfenced open="[" close="]"><mi>•</mi></mfenced>' },
      { title: '{ }', preview: '{•}', snippet: '<mfenced open="{" close="}"><mi>•</mi></mfenced>' },
      { title: '〈 〉', preview: '〈•〉', snippet: '<mfenced open="〈" close="〉"><mi>•</mi></mfenced>' }
    ]
  },
  {
    title: 'Exponents & Roots',
    items: [
      { title: 'Superscript', preview: 'x^{•}', snippet: '<msup><mi>x</mi><mi>•</mi></msup>' },
      { title: 'Subscript', preview: 'x_{•}', snippet: '<msub><mi>x</mi><mi>•</mi></msub>' },
      { title: 'Power', preview: '•^{•}', snippet: '<msup><mi>•</mi><mi>•</mi></msup>' },
      { title: 'Square Root', preview: '√•', snippet: '<msqrt><mi>•</mi></msqrt>' },
      { title: 'Nth Root', preview: '√[•]{•}', snippet: '<mroot><mi>•</mi><mi>•</mi></mroot>' }
    ]
  },
  {
    title: 'Matrices',
    items: [
      { title: '2×2 Matrix', preview: '[• •; • •]', snippet: '<mrow><mo>[</mo><mtable><mtr><mtd>•</mtd><mtd>•</mtd></mtr><mtr><mtd>•</mtd><mtd>•</mtd></mtr></mtable><mo>]</mo></mrow>' },
      { title: '3×3 Matrix', preview: '[• • •; • • •; • • •]', snippet: '<mrow><mo>[</mo><mtable><mtr><mtd>•</mtd><mtd>•</mtd><mtd>•</mtd></mtr><mtr><mtd>•</mtd><mtd>•</mtd><mtd>•</mtd></mtr><mtr><mtd>•</mtd><mtd>•</mtd><mtd>•</mtd></mtr></mtable><mo>]</mo></mrow>' }
    ]
  },
  {
    title: 'Calculus',
    items: [
      { title: 'Integral', preview: '∫', snippet: '<msubsup><mo>∫</mo><mi>•</mi><mi>•</mi></msubsup><mi>•</mi><mo>d</mo><mi>•</mi>' },
      { title: 'Sum', preview: '∑', snippet: '<msubsup><mo>∑</mo><mi>i=•</mi><mi>•</mi></msubsup><mi>•</mi>' },
      { title: 'Product', preview: '∏', snippet: '<msubsup><mo>∏</mo><mi>•</mi><mi>•</mi></msubsup><mi>•</mi>' },
      { title: 'Limit', preview: 'lim', snippet: '<munder><mo>lim</mo><mrow><mi>•</mi><mo>→</mo><mi>•</mi></mrow></munder><mi>•</mi>' },
      { title: 'Partial', preview: '∂', snippet: '<mo>∂</mo>' },
      { title: 'Nabla', preview: '∇', snippet: '<mo>∇</mo>' }
    ]
  },
  {
    title: 'Logic',
    items: [
      { title: '¬', preview: '¬', snippet: '<mo>¬</mo>' },
      { title: '∧', preview: '∧', snippet: '<mo>∧</mo>' },
      { title: '∨', preview: '∨', snippet: '<mo>∨</mo>' },
      { title: '⇒', preview: '⇒', snippet: '<mo>⇒</mo>' },
      { title: '⇔', preview: '⇔', snippet: '<mo>⇔</mo>' }
    ]
  },
  {
    title: 'Set Theory',
    items: [
      { title: '∈', preview: '∈', snippet: '<mo>∈</mo>' },
      { title: '∉', preview: '∉', snippet: '<mo>∉</mo>' },
      { title: '⊂', preview: '⊂', snippet: '<mo>⊂</mo>' },
      { title: '⊆', preview: '⊆', snippet: '<mo>⊆</mo>' },
      { title: '∪', preview: '∪', snippet: '<mo>∪</mo>' },
      { title: '∩', preview: '∩', snippet: '<mo>∩</mo>' }
    ]
  },
  {
    title: 'Geometry',
    items: [
      { title: '∠', preview: '∠', snippet: '<mo>∠</mo>' },
      { title: '⟂', preview: '⟂', snippet: '<mo>⟂</mo>' },
      { title: '∥', preview: '∥', snippet: '<mo>∥</mo>' }
    ]
  },
  {
    title: 'Text Styles',
    items: [
      { title: 'double-struck', preview: 'ℤ', snippet: '<mstyle mathvariant="double-struck"><mi>•</mi></mstyle>' },
      { title: 'bold', preview: '𝐱', snippet: '<mstyle mathvariant="bold"><mi>•</mi></mstyle>' },
      { title: 'calligraphic', preview: '𝒞', snippet: '<mstyle mathvariant="script"><mi>•</mi></mstyle>' }
    ]
  },
  {
    title: 'Spacing',
    items: [
      { title: 'comma', preview: ',', snippet: ',' },
      { title: 'semicolon', preview: ';', snippet: ';' },
      { title: 'bang', preview: '!', snippet: '!' },
      { title: 'quad', preview: 'quad', snippet: 'quad' }
    ]
  },
  // Extended parity with TeX groups
  {
    title: 'Greek (variants)',
    items: [
      { title: 'varepsilon', preview: 'ε', snippet: '<mi>ε</mi>' },
      { title: 'varphi', preview: 'ϕ', snippet: '<mi>ϕ</mi>' },
      { title: 'varpi', preview: 'ϖ', snippet: '<mi>ϖ</mi>' },
      { title: 'varrho', preview: 'ϱ', snippet: '<mi>ϱ</mi>' },
      { title: 'varsigma', preview: 'ς', snippet: '<mi>ς</mi>' },
      { title: 'vartheta', preview: 'ϑ', snippet: '<mi>ϑ</mi>' },
      { title: 'Digamma', preview: 'Ϝ', snippet: '<mi>Ϝ</mi>' },
      { title: 'digamma', preview: 'ϝ', snippet: '<mi>ϝ</mi>' }
    ]
  },
  {
    title: 'Arrows (extended)',
    items: [
      { title: '↑', preview: '↑', snippet: '<mo>↑</mo>' },
      { title: '↓', preview: '↓', snippet: '<mo>↓</mo>' },
      { title: '↕', preview: '↕', snippet: '<mo>↕</mo>' },
      { title: '⇑', preview: '⇑', snippet: '<mo>⇑</mo>' },
      { title: '⇓', preview: '⇓', snippet: '<mo>⇓</mo>' },
      { title: '⇕', preview: '⇕', snippet: '<mo>⇕</mo>' },
      { title: '↦', preview: '↦', snippet: '<mo>↦</mo>' },
      { title: '⟶', preview: '⟶', snippet: '<mo>⟶</mo>' },
      { title: '⟵', preview: '⟵', snippet: '<mo>⟵</mo>' },
      { title: '⟹', preview: '⟹', snippet: '<mo>⟹</mo>' },
      { title: '⟸', preview: '⟸', snippet: '<mo>⟸</mo>' },
      { title: '↭', preview: '↭', snippet: '<mo>↭</mo>' },
      { title: '⇒', preview: '⇒', snippet: '<mo>⇒</mo>' },
      { title: '⇔', preview: '⇔', snippet: '<mo>⇔</mo>' }
    ]
  },
  {
    title: 'Set theory (extended)',
    items: [
      { title: '⊊', preview: '⊊', snippet: '<mo>⊊</mo>' },
      { title: '⊋', preview: '⊋', snippet: '<mo>⊋</mo>' },
      { title: '⫋', preview: '⫋', snippet: '<mo>⫋</mo>' },
      { title: '⫌', preview: '⫌', snippet: '<mo>⫌</mo>' },
      { title: '⊈', preview: '⊈', snippet: '<mo>⊈</mo>' },
      { title: '⊉', preview: '⊉', snippet: '<mo>⊉</mo>' },
      { title: '⊏', preview: '⊏', snippet: '<mo>⊏</mo>' },
      { title: '⊐', preview: '⊐', snippet: '<mo>⊐</mo>' },
      { title: '⊑', preview: '⊑', snippet: '<mo>⊑</mo>' },
      { title: '⊒', preview: '⊒', snippet: '<mo>⊒</mo>' }
    ]
  },
  {
    title: 'Operators (big)',
    items: [
      { title: '⋃', preview: '⋃', snippet: '<mo>⋃</mo>' },
      { title: '⋂', preview: '⋂', snippet: '<mo>⋂</mo>' },
      { title: '⋈', preview: '⋈', snippet: '<mo>⋈</mo>' },
      { title: '∐', preview: '∐', snippet: '<mo>∐</mo>' },
      { title: '⋁', preview: '⋁', snippet: '<mo>⋁</mo>' },
      { title: '⋀', preview: '⋀', snippet: '<mo>⋀</mo>' },
      { title: '⊙', preview: '⊙', snippet: '<mo>⊙</mo>' },
      { title: '⊗', preview: '⊗', snippet: '<mo>⊗</mo>' },
      { title: '⊕', preview: '⊕', snippet: '<mo>⊕</mo>' }
    ]
  },
  {
    title: 'Fonts (letters)',
    items: [
      { title: 'double-struck R', preview: 'ℝ', snippet: '<mstyle mathvariant="double-struck"><mi>R</mi></mstyle>' },
      { title: 'double-struck N', preview: 'ℕ', snippet: '<mstyle mathvariant="double-struck"><mi>N</mi></mstyle>' },
      { title: 'double-struck Q', preview: 'ℚ', snippet: '<mstyle mathvariant="double-struck"><mi>Q</mi></mstyle>' },
      { title: 'fraktur g', preview: '𝔤', snippet: '<mstyle mathvariant="fraktur"><mi>g</mi></mstyle>' },
      { title: 'roman d', preview: 'd', snippet: '<mstyle mathvariant="normal"><mi>d</mi></mstyle>' },
      { title: 'sans-serif A', preview: 'A', snippet: '<mstyle mathvariant="sans-serif"><mi>A</mi></mstyle>' }
    ]
  },
  {
    title: 'Misc',
    items: [
      { title: 'binom(•,•)', preview: '() over ()', snippet: '<mrow><mo>(</mo><mfrac linethickness="0"><mi>•</mi><mi>•</mi></mfrac><mo>)</mo></mrow>' },
      { title: 'ceil(•)', preview: '⌈•⌉', snippet: '<mfenced open="⌈" close="⌉"><mi>•</mi></mfenced>' },
      { title: 'floor(•)', preview: '⌊•⌋', snippet: '<mfenced open="⌊" close="⌋"><mi>•</mi></mfenced>' },
      { title: 'Re', preview: 'ℜ', snippet: '<mi>ℜ</mi>' },
      { title: 'Im', preview: 'ℑ', snippet: '<mi>ℑ</mi>' },
      { title: 'operator(•)', preview: 'op(•)', snippet: '<mi>•</mi>' }
    ]
  }
];

const ASCIIMATH_GROUPS: MathSymbolGroup[] = [
  {
    title: 'Greek (lowercase)',
    items: greekLowercase.map(([name, glyph]) => ({ title: name, preview: glyph, snippet: name }))
  },
  {
    title: 'Greek (uppercase)',
    items: greekUppercase.map(([name, glyph]) => ({ title: name, preview: glyph, snippet: name }))
  },
  {
    title: 'Operators',
    items: [
      { title: '+', preview: '+', snippet: '+' },
      { title: '-', preview: '−', snippet: '-' },
      { title: 'xx', preview: '×', snippet: 'xx' },
      { title: 'div', preview: '÷', snippet: 'div' },
      { title: 'cdot', preview: '·', snippet: 'cdot' },
      { title: 'pm', preview: '±', snippet: 'pm' },
      { title: 'mp', preview: '∓', snippet: 'mp' }
    ]
  },
  {
    title: 'Relations',
    items: [
      { title: '=', preview: '=', snippet: '=' },
      { title: '!=', preview: '≠', snippet: '!=' },
      { title: '~~', preview: '≈', snippet: '~~' },
      { title: '<=', preview: '≤', snippet: '<=' },
      { title: '>=', preview: '≥', snippet: '>=' }
    ]
  },
  {
    title: 'Arrows',
    items: [
      { title: '->', preview: '→', snippet: '->' },
      { title: '<-', preview: '←', snippet: '<-' },
      { title: '=>', preview: '⇒', snippet: '=>' },
      { title: '<=', preview: '⇐', snippet: '<=' },
      { title: '<->', preview: '↔', snippet: '<->' }
    ]
  },
  {
    title: 'Accents',
    items: [
      { title: 'hat', preview: 'ŷ', snippet: 'hat(•)' },
      { title: 'bar', preview: 'x̄', snippet: 'bar(•)' },
      { title: 'tilde', preview: 'ã', snippet: 'tilde(•)' }
    ]
  },
  {
    title: 'Accents (wide)',
    items: [
      { title: 'overline(•)', preview: 'x̄', snippet: 'overline(•)' },
      { title: 'underline(•)', preview: 'x̲', snippet: 'underline(•)' },
      { title: 'vec(•)', preview: '→x', snippet: 'vec(•)' },
      { title: 'overbrace(•)', preview: '⏞', snippet: 'overbrace(•)' },
      { title: 'underbrace(•)', preview: '⏟', snippet: 'underbrace(•)' }
    ]
  },
  {
    title: 'Delimiters',
    items: [
      { title: '( )', preview: '(•)', snippet: '(•)' },
      { title: '[ ]', preview: '[•]', snippet: '[•]' },
      { title: '{ }', preview: '{•}', snippet: '{•}' },
      { title: '〈 〉', preview: '〈•〉', snippet: 'langl • rangl' }
    ]
  },
  {
    title: 'Exponents & Roots',
    items: [
      { title: 'Superscript', preview: 'x^•', snippet: 'x^•' },
      { title: 'Subscript', preview: 'x_•', snippet: 'x_•' },
      { title: 'Power', preview: '•^•', snippet: '•^•' },
      { title: 'Square Root', preview: '√•', snippet: 'sqrt(•)' },
      { title: 'Nth Root', preview: '√[•]{•}', snippet: 'root(•)(•)' }
    ]
  },
  {
    title: 'Matrices',
    items: [
      { title: '2x2 Matrix', preview: '[• •; • •]', snippet: 'matrix((•,•),(•,•))' },
      { title: '3x3 Matrix', preview: '[• • •; • • •; • • •]', snippet: 'matrix((•,•,•),(•,•,•),(•,•,•))' }
    ]
  },
  {
    title: 'Calculus',
    items: [
      { title: 'Integral', preview: '∫', snippet: 'int_•^• • d•' },
      { title: 'Sum', preview: '∑', snippet: 'sum_(i=•)^• •' },
      { title: 'Product', preview: '∏', snippet: 'prod_(•)^• •' },
      { title: 'Limit', preview: 'lim', snippet: 'lim_(•->•) •' },
      { title: 'partial', preview: '∂', snippet: 'partial' },
      { title: 'nabla', preview: '∇', snippet: 'nabla' }
    ]
  },
  {
    title: 'Logic',
    items: [
      { title: 'not', preview: '¬', snippet: 'not' },
      { title: 'and', preview: '∧', snippet: 'and' },
      { title: 'or', preview: '∨', snippet: 'or' },
      { title: '=>', preview: '⇒', snippet: '=>' },
      { title: '<=>', preview: '⇔', snippet: '<=>' }
    ]
  },
  {
    title: 'Set Theory',
    items: [
      { title: 'in', preview: '∈', snippet: 'in' },
      { title: 'notin', preview: '∉', snippet: 'notin' },
      { title: 'subset', preview: '⊂', snippet: 'subset' },
      { title: 'subseteq', preview: '⊆', snippet: 'subseteq' },
      { title: 'cup', preview: '∪', snippet: 'cup' },
      { title: 'cap', preview: '∩', snippet: 'cap' }
    ]
  },
  {
    title: 'Geometry',
    items: [
      { title: 'angle', preview: '∠', snippet: 'angle' },
      { title: 'perp', preview: '⟂', snippet: 'perp' },
      { title: 'parallel', preview: '∥', snippet: 'parallel' }
    ]
  },
  {
    title: 'Text Styles',
    items: [
      { title: 'bb', preview: 'ℤ', snippet: 'bb(•)' },
      { title: 'bf', preview: '𝐱', snippet: 'bf(•)' },
      { title: 'cal', preview: '𝒞', snippet: 'cal(•)' }
    ]
  },
  {
    title: 'Spacing',
    items: [
      { title: 'comma', preview: ',', snippet: ',' },
      { title: 'semicolon', preview: ';', snippet: ';' },
      { title: 'bang', preview: '!', snippet: '!' },
      { title: 'quad', preview: 'quad', snippet: 'quad' }
    ]
  },
  // Extended parity with TeX groups
  {
    title: 'Greek (variants)',
    items: [
      { title: 'varepsilon', preview: 'ε', snippet: 'ε' },
      { title: 'varphi', preview: 'ϕ', snippet: 'ϕ' },
      { title: 'varpi', preview: 'ϖ', snippet: 'ϖ' },
      { title: 'varrho', preview: 'ϱ', snippet: 'ϱ' },
      { title: 'varsigma', preview: 'ς', snippet: 'ς' },
      { title: 'vartheta', preview: 'ϑ', snippet: 'ϑ' },
      { title: 'Digamma', preview: 'Ϝ', snippet: 'Ϝ' },
      { title: 'digamma', preview: 'ϝ', snippet: 'ϝ' }
    ]
  },
  {
    title: 'Arrows (extended)',
    items: [
      { title: 'uparrow', preview: '↑', snippet: '↑' },
      { title: 'downarrow', preview: '↓', snippet: '↓' },
      { title: 'updownarrow', preview: '↕', snippet: '↕' },
      { title: 'Uparrow', preview: '⇑', snippet: '⇑' },
      { title: 'Downarrow', preview: '⇓', snippet: '⇓' },
      { title: 'Updownarrow', preview: '⇕', snippet: '⇕' },
      { title: 'mapsto', preview: '↦', snippet: '↦' },
      { title: 'longrightarrow', preview: '⟶', snippet: '⟶' },
      { title: 'longleftarrow', preview: '⟵', snippet: '⟵' },
      { title: 'Longrightarrow', preview: '⟹', snippet: '⟹' },
      { title: 'Longleftarrow', preview: '⟸', snippet: '⟸' },
      { title: 'leftrightsquigarrow', preview: '↭', snippet: '↭' },
      { title: 'implies', preview: '⇒', snippet: '⇒' },
      { title: 'iff', preview: '⇔', snippet: '⇔' }
    ]
  },
  {
    title: 'Set theory (extended)',
    items: [
      { title: 'subsetneq', preview: '⊊', snippet: '⊊' },
      { title: 'supsetneq', preview: '⊋', snippet: '⊋' },
      { title: 'subsetneqq', preview: '⫋', snippet: '⫋' },
      { title: 'supsetneqq', preview: '⫌', snippet: '⫌' },
      { title: 'nsubseteq', preview: '⊈', snippet: '⊈' },
      { title: 'nsupseteq', preview: '⊉', snippet: '⊉' },
      { title: 'sqsubset', preview: '⊏', snippet: '⊏' },
      { title: 'sqsupset', preview: '⊐', snippet: '⊐' },
      { title: 'sqsubseteq', preview: '⊑', snippet: '⊑' },
      { title: 'sqsupseteq', preview: '⊒', snippet: '⊒' }
    ]
  },
  {
    title: 'Operators (big)',
    items: [
      { title: 'bigcup', preview: '⋃', snippet: '⋃' },
      { title: 'bigcap', preview: '⋂', snippet: '⋂' },
      { title: 'bigsqcup', preview: '⋈', snippet: '⋈' },
      { title: 'coprod', preview: '∐', snippet: '∐' },
      { title: 'bigvee', preview: '⋁', snippet: '⋁' },
      { title: 'bigwedge', preview: '⋀', snippet: '⋀' },
      { title: 'bigodot', preview: '⊙', snippet: '⊙' },
      { title: 'bigotimes', preview: '⊗', snippet: '⊗' },
      { title: 'bigoplus', preview: '⊕', snippet: '⊕' }
    ]
  },
  {
    title: 'Fonts (letters)',
    items: [
      { title: 'bb(R)', preview: 'ℝ', snippet: 'bb(R)' },
      { title: 'bb(N)', preview: 'ℕ', snippet: 'bb(N)' },
      { title: 'bb(Q)', preview: 'ℚ', snippet: 'bb(Q)' },
      { title: 'rm(d)', preview: 'd', snippet: 'rm(d)' },
      { title: 'sf(A)', preview: 'A', snippet: 'sf(A)' }
    ]
  },
  {
    title: 'Misc',
    items: [
      { title: 'ceil(•)', preview: '⌈•⌉', snippet: 'ceil(•)' },
      { title: 'floor(•)', preview: '⌊•⌋', snippet: 'floor(•)' },
      { title: 'Re', preview: 'ℜ', snippet: 'Re' },
      { title: 'Im', preview: 'ℑ', snippet: 'Im' }
    ]
  }
];

export const MATH_PALETTES: Record<PaletteMode, MathSymbolGroup[]> = {
  tex: TEX_GROUPS,
  mathml: MATHML_GROUPS,
  asciimath: ASCIIMATH_GROUPS
};
