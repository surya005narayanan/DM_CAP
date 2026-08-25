import { TokenType, tokenize } from './tokenizer';
import type { Token } from './tokenizer';

export type ASTNode =
  | { type: 'VARIABLE'; name: string }
  | { type: 'NOT'; operand: ASTNode }
  | { type: 'AND'; left: ASTNode; right: ASTNode }
  | { type: 'OR'; left: ASTNode; right: ASTNode }
  | { type: 'XOR'; left: ASTNode; right: ASTNode };

export class Parser {
  private tokens: Token[];
  private current = 0;

  constructor(input: string) {
    this.tokens = tokenize(input);
  }

  public parse(): ASTNode {
    const ast = this.expression();
    if (!this.isAtEnd()) {
      throw new Error(`Unexpected token at end: ${this.peek().value}`);
    }
    return ast;
  }

  private expression(): ASTNode {
    return this.orXor();
  }

  private orXor(): ASTNode {
    let expr = this.and();

    while (this.match(TokenType.OR, TokenType.XOR)) {
      const operator = this.previous().type;
      const right = this.and();
      expr = {
        type: operator === TokenType.OR ? 'OR' : 'XOR',
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  private and(): ASTNode {
    let expr = this.unary();

    while (this.match(TokenType.AND)) {
      const right = this.unary();
      expr = {
        type: 'AND',
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  private unary(): ASTNode {
    if (this.match(TokenType.NOT)) {
      const right = this.unary();
      return {
        type: 'NOT',
        operand: right,
      };
    }

    return this.primary();
  }

  private primary(): ASTNode {
    if (this.match(TokenType.VARIABLE)) {
      return { type: 'VARIABLE', name: this.previous().value };
    }

    if (this.match(TokenType.LPAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RPAREN, "Expected ')' after expression.");
      return expr;
    }

    throw new Error(`Unexpected token: ${this.peek().value}`);
  }

  // Helpers
  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }
}
