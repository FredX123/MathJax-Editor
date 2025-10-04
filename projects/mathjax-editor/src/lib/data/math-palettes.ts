import { MathSymbolGroup } from '../model/symbol-group.model';
import { MathInputMode } from '../types';

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
      { title: '\times', preview: '×', snippet: '\times' },
      { title: '\div', preview: '÷', snippet: '\div' },
      { title: '\cdot', preview: '·', snippet: '\cdot' },
      { title: '\pm', preview: '±', snippet: '\pm' },
      { title: '\mp', preview: '∓', snippet: '\mp' }
    ]
  },
  {
    title: 'Relations',
    items: [
      { title: '=', preview: '=', snippet: '=' },
      { title: '\neq', preview: '≠', snippet: '\neq' },
      { title: '\approx', preview: '≈', snippet: '\approx' },
      { title: '\leq', preview: '≤', snippet: '\leq' },
      { title: '\geq', preview: '≥', snippet: '\geq' }
    ]
  },
  {
    title: 'Arrows',
    items: [
      { title: '\to', preview: '→', snippet: '\to' },
      { title: '\leftarrow', preview: '←', snippet: '\leftarrow' },
      { title: '\Rightarrow', preview: '⇒', snippet: '\Rightarrow' },
      { title: '\Leftarrow', preview: '⇐', snippet: '\Leftarrow' },
      { title: '\leftrightarrow', preview: '↔', snippet: '\leftrightarrow' }
    ]
  },
  {
    title: 'Accents',
    items: [
      { title: '\hat{•}', preview: 'ŷ', snippet: '\hat{•}' },
      { title: '\bar{•}', preview: 'x̄', snippet: '\bar{•}' },
      { title: '\tilde{•}', preview: 'ã', snippet: '\tilde{•}' }
    ]
  },
  {
    title: 'Delimiters',
    items: [
      { title: '( )', preview: '(•)', snippet: '\left( • \right)' },
      { title: '[ ]', preview: '[•]', snippet: '\left[ • \right]' },
      { title: '{ }', preview: '{•}', snippet: '\left\{ • \right\}' },
      { title: '〈 〉', preview: '〈•〉', snippet: '\left\langle • \right\rangle' }
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
      { title: '2×2 Matrix', preview: '[• •; • •]', snippet: '\begin{bmatrix}• & • \\ • & • \end{bmatrix}' },
      { title: '3×3 Matrix', preview: '[• • •; • • •; • • •]', snippet: '\begin{bmatrix}• & • & • \\ • & • & • \\ • & • & • \end{bmatrix}' }
    ]
  },
  {
    title: 'Calculus',
    items: [
      { title: 'Integral', preview: '∫', snippet: '\int_{•}^{•} • \, d•' },
      { title: 'Sum', preview: '∑', snippet: '\sum_{i=•}^{•} •' },
      { title: 'Product', preview: '∏', snippet: '\prod_{•}^{•} •' },
      { title: 'Limit', preview: 'lim', snippet: '\lim_{• \to •} •' },
      { title: 'Partial', preview: '∂', snippet: '\partial' },
      { title: 'Nabla', preview: '∇', snippet: '\nabla' }
    ]
  },
  {
    title: 'Logic',
    items: [
      { title: '\lnot', preview: '¬', snippet: '\lnot' },
      { title: '\land', preview: '∧', snippet: '\land' },
      { title: '\lor', preview: '∨', snippet: '\lor' },
      { title: '\implies', preview: '⇒', snippet: '\implies' },
      { title: '\iff', preview: '⇔', snippet: '\iff' }
    ]
  },
  {
    title: 'Set Theory',
    items: [
      { title: '\in', preview: '∈', snippet: '\in' },
      { title: '\notin', preview: '∉', snippet: '\notin' },
      { title: '\subset', preview: '⊂', snippet: '\subset' },
      { title: '\subseteq', preview: '⊆', snippet: '\subseteq' },
      { title: '\cup', preview: '∪', snippet: '\cup' },
      { title: '\cap', preview: '∩', snippet: '\cap' }
    ]
  },
  {
    title: 'Geometry',
    items: [
      { title: '\angle', preview: '∠', snippet: '\angle' },
      { title: '\perp', preview: '⟂', snippet: '\perp' },
      { title: '\parallel', preview: '∥', snippet: '\parallel' }
    ]
  },
  {
    title: 'Text Styles',
    items: [
      { title: '\mathbb{•}', preview: 'ℤ', snippet: '\mathbb{•}' },
      { title: '\mathbf{•}', preview: '𝐱', snippet: '\mathbf{•}' },
      { title: '\mathcal{•}', preview: '𝒞', snippet: '\mathcal{•}' }
    ]
  },
  {
    title: 'Spacing',
    items: [
      { title: '\,', preview: '\,', snippet: '\,' },
      { title: '\;', preview: '\;', snippet: '\;' },
      { title: '\!', preview: '\!', snippet: '\!' },
      { title: '\quad', preview: '\quad', snippet: '\quad' }
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
      { title: 'script', preview: '𝒞', snippet: '<mstyle mathvariant="script"><mi>•</mi></mstyle>' }
    ]
  },
  {
    title: 'Spacing',
    items: [
      { title: 'thin space', preview: 'thin', snippet: '<mspace width="0.167em"/>' },
      { title: 'medium space', preview: 'med', snippet: '<mspace width="0.25em"/>' },
      { title: 'negative thin', preview: 'neg', snippet: '<mspace width="-0.167em"/>' },
      { title: 'quad', preview: 'quad', snippet: '<mspace width="1em"/>' }
    ]
  }
];

const ASCIIMATH_GROUPS: MathSymbolGroup[] = [
  {
    title: 'Greek (lowercase)',
    items: greekLowercase.map(([name, glyph]) => ({
      title: name,
      preview: glyph,
      snippet: name
    }))
  },
  {
    title: 'Greek (uppercase)',
    items: greekUppercase.map(([name, glyph]) => ({
      title: name,
      preview: glyph,
      snippet: name
    }))
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
  }
];

export const MATH_PALETTES: Record<MathInputMode, MathSymbolGroup[]> = {
  tex: TEX_GROUPS,
  mathml: MATHML_GROUPS,
  asciimath: ASCIIMATH_GROUPS
};

export const SAMPLE_EXPRESSIONS: Record<MathInputMode, string> = {
  tex: `$$\\int_0^\\infty \\frac{x^3}{e^x-1}\\,dx = \\frac{\\pi^4}{15}$$`,
  mathml: `\
<math display="block">\
  <mrow>\
    <msubsup>\
      <mo>∫</mo>\
      <mn>0</mn>\
      <mo>∞</mo>\
    </msubsup>\
    <mfrac>\
      <msup><mi>x</mi><mn>3</mn></msup>\
      <mrow>\
        <msup><mi>e</mi><mi>x</mi></msup>\
        <mo>−</mo>\
        <mn>1</mn>\
      </mrow>\
    </mfrac>\
    <mo>d</mo><mi>x</mi>\
    <mo>=</mo>\
    <mfrac>\
      <msup><mi>π</mi><mn>4</mn></msup>\
      <mn>15</mn>\
    </mfrac>\
  </mrow>\
</math>\
`.trim(),
  asciimath: 'int_0^infty x^3/(e^x - 1) dx = (pi^4)/15'
};
