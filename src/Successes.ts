const VALID_SYMBOLS: string[] = [ '=', '<', '<=', '>', '>=' ];
/** Class representing a range on integers as defined by a given mathematical
 * expression. */
export class Successes {
  // fields
  private _values: number[];

  // constructor

  /**
   * Create an array of integers representing an given mathematical expression.
   * @param {string} s - A string representing a set of successes.
   * @param {number} n - Number of trials.
   */
  constructor(s: string, n: number) { this._values = this._parse(s, n); }

  // public methods

  /**
   * Return a string representation of this object.
   * @return {string} A string representing this object.
   */
  public toString(): string { return this._values.toString(); }

  // getters

  /**
   * Return values.
   * @return {number[]} An array of integers.
   */
  public getValues(): number[] { return this._values; }

  // setters

  /**
   * Set values equal to an array of integers representing an given mathematical
   * expression.
   * @param {string} s - A string representing a set of successes.
   * @param {number} n - Number of trials.
   */
  public setValues(s: string, n: number) { this._values = this._parse(s, n); }

  // private methods

  /**
   * Parses a string representing a set of successes into an array on integers.
   * @param {string} s - A string representing a set of successes.
   * @param {number} n - Number of trials.
   * @return {number[]} An array on integers.
   */
  private _parse(s: string, n: number): number[] {
    let result: number[] = [];
    // split s into a string array
    let arr: string[] = s.split(' ');
    // if arr.length does not equal 3 or 5 then s must not represent an valid
    // mathematical statement
    if (arr.length != 3 && arr.length != 5) {
      throw new Error(s + ' is not a valid mathematical statement');
    }

    if (arr.length == 3) { // arr.length = 3

      let r: number;

      if (this._isVariable(arr[0]) && this._isValidSymbol(arr[1]) &&
          this._isInteger(arr[2])) { // x o a, where o is in VALID_SYMBOLS

        r = +arr[2];

        if (r < 0 || r > n) {
          throw new RangeError(r + ' is not in [0, ' + n + ']');
        }

        if (arr[1] == '=') { // if o is '='
          result.push(r);
        } else if (arr[1] == '<') { // if o is '<'
          for (let i = 0; i < r; i++) {
            result.push(i);
          }
        } else if (arr[1] == '<=') { // if o is '<='
          for (let i = 0; i <= r; i++) {
            result.push(i);
          }
        } else if (arr[1] == '>') { // if o is '>'
          for (let i = r + 1; i <= n; i++) {
            result.push(i);
          }
        } else if (arr[1] == '>=') { // if o is '>='
          for (let i = r; i <= n; i++) {
            result.push(i);
          }
        }

      } else if (this._isInteger(arr[0]) && this._isValidSymbol(arr[1]) &&
                 this._isVariable(
                     arr[2])) { // a o x, where o is in VALID_SYMBOLS

        r = +arr[0];

        if (r < 0 || r > n) {
          throw new RangeError(r + ' is not in [0, ' + n + ']');
        }

        if (arr[1] == '=') { // if o is '='
          result.push(r);
        } else if (arr[1] == '<') { // if o is '<'
          for (let i = r + 1; i <= n; i++) {
            result.push(i);
          }
        } else if (arr[1] == '<=') { // if o is '<='
          for (let i = r; i <= n; i++) {
            result.push(i);
          }
        } else if (arr[1] == '>') { // if o is '>'
          for (let i = 0; i < r; i++) {
            result.push(i);
          }
        } else if (arr[1] == '>=') { // if o is '>='
          for (let i = 0; i <= r; i++) {
            result.push(i);
          }
        }

      } else {
        throw new Error(s + ' is not a valid mathematical statement');
      }

    } else { // arr.length = 5
      if (this._isInteger(arr[0]) && this._isValidSymbol(arr[1]) &&
          this._isVariable(arr[2]) && this._isValidSymbol(arr[3]) &&
          this._isInteger(arr[4]) && arr[1] != '=' && arr[3] != '=') {

        let a: number = +arr[0];
        let b: number = +arr[4];

        if (a < b) {
          if (arr[1] == '<' && arr[3] == '<' && b - a > 1) { // a < x < b
            for (let i = a + 1; i < b; i++) {
              result.push(i);
            }
          } else if (arr[1] == '<' && arr[3] == '<=') { // a < x <= b
            for (let i = a + 1; i <= b; i++) {
              result.push(i);
            }
          } else if (arr[1] == '<=' && arr[3] == '<') { // a <= x < b
            for (let i = a; i < b; i++) {
              result.push(i);
            }
          } else if (arr[1] == '<=' && arr[3] == '<=') { // a <= x <= b
            for (let i = a; i <= b; i++) {
              result.push(i);
            }
          } else {
            throw new RangeError(s + ' is not a valid mathematical expression');
          }
        } else if (a > b) {
          if (arr[1] == '>' && arr[3] == '>' && a - b > 1) { // a > x > b
            for (let i = b + 1; i < a; i++) {
              result.push(i);
            }
          } else if (arr[1] == '>' && arr[3] == '>=') { // a > x >= b
            for (let i = b; i < a; i++) {
              result.push(i);
            }
          } else if (arr[1] == '>=' && arr[3] == '>') { // a >= x > b
            for (let i = b + 1; i <= a; i++) {
              result.push(i);
            }
          } else if (arr[1] == '>=' && arr[3] == '>=') { // a >= x >= b
            for (let i = b; i <= a; i++) {
              result.push(i);
            }
          } else {
            throw new RangeError(s + ' is not a valid mathematical expression');
          }
        } else {
          throw new RangeError(s + ' is not a valid mathematical expression');
        }

      } else {
        throw new Error(s + ' is not a valid mathematical statement');
      }
    }

    return result;
  }

  /**
   * Return true if s is a letter between a and z.
   * @param {string} s - A possible variable.
   * @return {boolean} Return true if s is a letter between a and z.
   */
  private _isVariable(s: string): boolean {
    return s.length == 1 && s >= 'A' && s <= 'z';
  }

  /**
   * Return true if s is an integer.
   * @param {string} s - A possible integer.
   * @return {boolean} Return true if s is an integer.
   */
  private _isInteger(s: string): boolean {
    let i: number = +s;
    if (i % 1 == 0) {
      return true;
    }
    return false;
  }

  /**
   * Return true if s is a valid mathematical symbol.
   * @param {string} s - A possible mathematical symbol.
   * @return {boolean} Return true if s is a valid mathematical symbol.
   */
  private _isValidSymbol(s: string): boolean {
    if (VALID_SYMBOLS.indexOf(s) >= 0) {
      return true;
    }
    return false;
  }
}
