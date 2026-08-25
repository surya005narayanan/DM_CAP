import type { ASTNode } from './parser';

export type Assignment = Record<string, boolean>;

export function evaluate(node: ASTNode, assignment: Assignment): boolean {
  switch (node.type) {
    case 'VARIABLE': {
      const val = assignment[node.name];
      if (val === undefined) {
        throw new Error(`Variable ${node.name} is not assigned a value.`);
      }
      return val;
    }
    case 'NOT':
      return !evaluate(node.operand, assignment);
    case 'AND':
      return evaluate(node.left, assignment) && evaluate(node.right, assignment);
    case 'OR':
      return evaluate(node.left, assignment) || evaluate(node.right, assignment);
    case 'XOR': {
      const leftVal = evaluate(node.left, assignment);
      const rightVal = evaluate(node.right, assignment);
      return (leftVal && !rightVal) || (!leftVal && rightVal);
    }
  }
}

export function extractVariables(node: ASTNode): string[] {
  const vars = new Set<string>();

  function traverse(n: ASTNode) {
    if (n.type === 'VARIABLE') {
      vars.add(n.name);
    } else if (n.type === 'NOT') {
      traverse(n.operand);
    } else {
      traverse(n.left);
      traverse(n.right);
    }
  }

  traverse(node);
  return Array.from(vars).sort();
}
