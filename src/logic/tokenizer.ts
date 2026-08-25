export const TokenType = {
  VARIABLE: 'VARIABLE',
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  XOR: 'XOR',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  EOF: 'EOF',
} as const;

export type TokenType = typeof TokenType[keyof typeof TokenType];

export interface Token {
  type: TokenType;
  value: string;
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (char === '(') {
      tokens.push({ type: TokenType.LPAREN, value: '(' });
      i++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: TokenType.RPAREN, value: ')' });
      i++;
      continue;
    }

    if (char === '∧' || (char === '&' && input[i + 1] === '&')) {
      tokens.push({ type: TokenType.AND, value: 'AND' });
      i += char === '&' ? 2 : 1;
      continue;
    }

    if (char === '∨' || (char === '|' && input[i + 1] === '|')) {
      tokens.push({ type: TokenType.OR, value: 'OR' });
      i += char === '|' ? 2 : 1;
      continue;
    }

    if (char === '¬' || char === '!' || char === '~') {
      tokens.push({ type: TokenType.NOT, value: 'NOT' });
      i++;
      continue;
    }

    if (char === '⊕') {
      tokens.push({ type: TokenType.XOR, value: 'XOR' });
      i++;
      continue;
    }

    // Try to match keywords or variables
    const match = input.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (match) {
      const word = match[0];
      const upperWord = word.toUpperCase();
      
      if (upperWord === 'AND') {
        tokens.push({ type: TokenType.AND, value: 'AND' });
      } else if (upperWord === 'OR') {
        tokens.push({ type: TokenType.OR, value: 'OR' });
      } else if (upperWord === 'NOT') {
        tokens.push({ type: TokenType.NOT, value: 'NOT' });
      } else if (upperWord === 'XOR') {
        tokens.push({ type: TokenType.XOR, value: 'XOR' });
      } else {
        tokens.push({ type: TokenType.VARIABLE, value: word });
      }
      i += word.length;
      continue;
    }

    throw new Error(`Invalid character at index ${i}: ${char}`);
  }

  tokens.push({ type: TokenType.EOF, value: 'EOF' });
  return tokens;
}
