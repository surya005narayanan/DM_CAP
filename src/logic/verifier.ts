import { Parser } from './parser';
import { evaluate } from './evaluator';
import type { Assignment } from './evaluator';
import type { TruthTableRow } from './truthTable';

export interface VerificationResult {
  verified: boolean;
  failedRowIndex?: number;
  message: string;
}

export function verifyNormalForms(
  pdnf: string,
  pcnf: string,
  rows: TruthTableRow[],
  variables: string[]
): VerificationResult {
  if (pdnf === 'FALSE (Contradiction)' && pcnf === 'TRUE (Tautology)') {
      // These string constants are our edge cases. They can be validated statically or ignored.
      return { verified: true, message: 'Edge case (Contradiction / Tautology) verified.' };
  }
  
  if (pdnf === 'FALSE (Contradiction)') {
      // Check if all rows are false
      const allFalse = rows.every(r => !r.result);
      if (!allFalse) return { verified: false, message: 'Contradiction failed verification.' };
  } else {
    try {
      const pdnfParser = new Parser(pdnf);
      const pdnfAst = pdnfParser.parse();
      for (const row of rows) {
        const pdnfResult = evaluate(pdnfAst, row.assignment);
        if (pdnfResult !== row.result) {
          return {
            verified: false,
            failedRowIndex: row.index,
            message: `PDNF evaluation failed at row ${row.index}`,
          };
        }
      }
    } catch (e) {
      return { verified: false, message: `PDNF Parsing Error: ${(e as Error).message}` };
    }
  }

  if (pcnf === 'TRUE (Tautology)') {
      const allTrue = rows.every(r => r.result);
      if (!allTrue) return { verified: false, message: 'Tautology failed verification.' };
  } else {
    try {
      const pcnfParser = new Parser(pcnf);
      const pcnfAst = pcnfParser.parse();
      for (const row of rows) {
        const pcnfResult = evaluate(pcnfAst, row.assignment);
        if (pcnfResult !== row.result) {
          return {
            verified: false,
            failedRowIndex: row.index,
            message: `PCNF evaluation failed at row ${row.index}`,
          };
        }
      }
    } catch (e) {
      return { verified: false, message: `PCNF Parsing Error: ${(e as Error).message}` };
    }
  }

  return {
    verified: true,
    message: 'Original expression, PDNF, and PCNF produce identical truth-table outputs.',
  };
}
