import type { ASTNode } from './parser';
import { evaluate, extractVariables } from './evaluator';
import type { Assignment } from './evaluator';

export interface TruthTableRow {
  assignment: Assignment;
  result: boolean;
  index: number;
}

export function generateTruthTable(node: ASTNode): { variables: string[]; rows: TruthTableRow[] } {
  const variables = extractVariables(node);
  
  if (variables.length > 8) {
    throw new Error('This expression contains too many variables for an interactive truth-table demonstration. Please use 8 or fewer variables.');
  }

  const numRows = Math.pow(2, variables.length);
  const rows: TruthTableRow[] = [];

  for (let i = 0; i < numRows; i++) {
    const assignment: Assignment = {};
    for (let j = 0; j < variables.length; j++) {
      // Create assignment mapping based on binary representation of i
      // We want standard ordering: e.g. for 2 vars (A, B) -> 00, 01, 10, 11
      const bit = (i >> (variables.length - 1 - j)) & 1;
      assignment[variables[j]] = bit === 1;
    }

    const result = evaluate(node, assignment);
    rows.push({
      assignment,
      result,
      index: i,
    });
  }

  return { variables, rows };
}
