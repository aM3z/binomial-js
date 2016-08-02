/** Class representing a binomial probability mass function. */

export class BinomialPMF {
  // fields
  private _r: number; // successes
  private _n: number; // trials
  private _p: number; // probability of success

  // constructor

  /**
   * Create a BinomialPMF.
   * @param {number} r - Number of successes.
   * @param {number} n - Number of trials.
   * @param {number} p - The probability of success.
   */
  constructor(r: number, n: number, p: number) {
    // number of successes and number of trials must be non-negative
    if (r < 0 || n < 0) {
      throw new RangeError(
          'number of successes and number of trials must be non-negative');
    }
    // number of successes and number of trials must integers
    if (r % 1 != 0 || n % 1 != 0) {
      throw new RangeError(
          'number of successes and number of trials must integers');
    }
    // number of successes cannot be grater than number of trials
    if (r > n) {
      throw new RangeError(
          'number of successes cannot be grater than number of trials');
    }
    // probability is quantified as a number between 0 and 1 (inclusive)
    if (p < 0 || p > 1) {
      throw new RangeError(
          'probability is quantified as a number between 0 and 1 (inclusive)');
    }
    // instantiate the fields
    this._r = r;
    this._n = n;
    this._p = p;
  }

  // public methods

  /**
   * Return the binomial probability mass function value.
   * @return {number} The binomial probability mass function value.
   */
  public getProbability(): number {
    return this._combination(this._n, this._r) * Math.pow(this._p, this._r) *
           Math.pow(1 - this._p, this._n - this._r);
  }

  /**
   * Return a string that represents this object.
   * @return {string} The string representation of this object.
   */
  public toString(): string {
    return 'P(r = ' + this._r + ' | ' + this._n + ', ' + this._p + ')';
  }

  // getters

  /**
   * Return r field value.
   * @return {number} r field value.
   */
  public getR(): number { return this._r; }

  /**
   * Return n field value.
   * @return {number} n field value.
   */
  public getN(): number { return this._n; }

  /**
   * Return p field value.
   * @return {number} p field value.
   */
  public getP(): number { return this._p; }

  // setters

  /**
   * Set r field value.
   * @param {number} r - New r field value.
   * @return {void}
   */
  public setR(r: number): void {
    // r cannot be less than 0
    if (r < 0) {
      throw new RangeError('r cannot be less than 0');
    }
    // r must be an integer
    if (r % 1 != 0) {
      throw new RangeError('r must be an integer');
    }
    // r cannot be greater than n
    if (r > this._n) {
      throw new RangeError('r cannot be greater than n');
    }

    this._r = r;
  }

  /**
   * Set n field value.
   * @param {number} n - New n field value.
   * @return {void}
   */
  public setN(n: number): void {
    // n cannot be less than 0
    if (n < 0) {
      throw new RangeError('n cannot be less than 0');
    }
    // n must be an integer
    if (n % 1 != 0) {
      throw new RangeError('n must be an integer');
    }
    // r cannot be greater than n
    if (n < this._r) {
      throw new RangeError('n cannot be less than r');
    }

    this._n = n;
  }

  /**
   * Set p field value.
   * @param {number} p - New p field value.
   * @return {void}
   */
  public setP(p: number): void {
    // probability is quantified as a number between 0 and 1 (inclusive)
    if (p < 0 || p > 1) {
      throw new RangeError(
          'probability is quantified as a number between 0 and 1 (inclusive)');
    }

    this._p = p;
  }

  // private methods

  /**
   * Return the number of ways of choosing k unordered outcomes from n
   * possibilities.
   * @param {number} n - Number of possibilities.
   * @param {number} k - Number of unordered outcomes.
   * @return {number} The number of ways of choosing k unordered outcomes from n
   * possibilities.
   */
  private _combination(n: number, k: number): number {
    // n and k must be non-negative numbers
    if (n < 0 || k < 0) {
      throw new RangeError('n and k must be non-negative numbers');
    }
    // n and k must be integers
    if (n % 1 != 0 || k % 1 != 0) {
      throw new RangeError('n and k must be integers');
    }
    // k cannot be greater than n
    if (k > n) {
      throw new RangeError('k cannot be greater than n');
    }

    return this._factorial(n) / (this._factorial(k) * this._factorial(n - k));
  }

  /**
   * Return n factorial, n(n - 1)() ... 2 * 1.
   * @param {number} n - A non-negative integer.
   * @return {number} n factorial
   */
  private _factorial(n: number): number {
    // factorials are only defined for integer values of n
    if (n % 1 != 0) {
      throw new RangeError(
          'factorial is not defined for non-integer values of n');
    }
    // factorials are only defined for non-negative numbers
    if (n < 0) {
      throw new RangeError('factorial is not defined for negative values of n');
    }
    // 1! = 1 and 0! = 1
    if (n == 0 || n == 1) {
      return 1;
    }
    // recur
    return n * this._factorial(n - 1);
  }
}
