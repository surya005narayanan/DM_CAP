import type { TruthTableRow } from './truthTable';

export interface Term {
  index: number;
  expression: string;
}

export interface NormalFormResult {
  minterms: Term[];
  maxterms: Term[];
  pdnf: string;
  pcnf: string;
}

export function generateNormalForms(variables: string[], rows: TruthTableRow[]): NormalFormResult {
  const minterms: Term[] = [];
  const maxterms: Term[] = [];

  for (const row of rows) {
    if (row.result === true) {
      // Minterm: F = 1. Value = 1 -> Variable, Value = 0 -> NOT Variable
      const parts = variables.map(v => (row.assignment[v] ? v : `¬${v}`));
      minterms.push({
        index: row.index,
        expression: `(${parts.join(' ∧ ')})`
      });
    } else {
      // Maxterm: F = 0. Value = 0 -> Variable, Value = 1 -> NOT Variable
      const parts = variables.map(v => (!row.assignment[v] ? v : `¬${v}`));
      maxterms.push({
        index: row.index,
        expression: `(${parts.join(' ∨ ')})`
      });
    }
  }

  // Handle Edge Cases: Tautology and Contradiction
  let pdnf = minterms.map(m => m.expression).join(' ∨ ');
  let pcnf = maxterms.map(m => m.expression).join(' ∧ ');

  if (minterms.length === 0) {
    pdnf = 'FALSE (Contradiction)';
  }
  
  if (maxterms.length === 0) {
    pcnf = 'TRUE (Tautology)';
  }

  return {
    minterms,
    maxterms,
    pdnf,
    pcnf
  };
}
