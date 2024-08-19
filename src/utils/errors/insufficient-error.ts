export class InsufficientError extends Error {
  constructor(paramName: string) {
    super(`Insufficient ${paramName}`);
    this.name = 'InsufficientBalanceError';
  }
}
