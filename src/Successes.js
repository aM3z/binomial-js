"use strict";
var VALID_SYMBOLS = ['=', '<', '<=', '>', '>='];
/** Class representing a range on integers as defined by a given mathematical
 * expression. */
var Successes = (function () {
    // constructor
    /**
     * Create an array of integers representing an given mathematical expression.
     * @param {string} s - A string representing a set of successes.
     * @param {number} n - Number of trials.
     */
    function Successes(s, n) {
        this._values = this._parse(s, n);
    }
    // public methods
    /**
     * Return a string representation of this object.
     * @return {string} A string representing this object.
     */
    Successes.prototype.toString = function () { return this._values.toString(); };
    // getters
    /**
     * Return values.
     * @return {number[]} An array of integers.
     */
    Successes.prototype.getValues = function () { return this._values; };
    // setters
    /**
     * Set values equal to an array of integers representing an given mathematical
     * expression.
     * @param {string} s - A string representing a set of successes.
     * @param {number} n - Number of trials.
     */
    Successes.prototype.setValues = function (s, n) { this._values = this._parse(s, n); };
    // private methods
    /**
     * Parses a string representing a set of successes into an array on integers.
     * @param {string} s - A string representing a set of successes.
     * @param {number} n - Number of trials.
     * @return {number[]} An array on integers.
     */
    Successes.prototype._parse = function (s, n) {
        var result = [];
        // split s into a string array
        var arr = s.split(' ');
        // if arr.length does not equal 3 or 5 then s must not represent an valid
        // mathematical statement
        if (arr.length != 3 && arr.length != 5) {
            throw new Error(s + ' is not a valid mathematical statement');
        }
        if (arr.length == 3) {
            var r = void 0;
            if (this._isVariable(arr[0]) && this._isValidSymbol(arr[1]) &&
                this._isInteger(arr[2])) {
                r = +arr[2];
                if (r < 0 || r > n) {
                    throw new RangeError(r + ' is not in [0, ' + n + ']');
                }
                if (arr[1] == '=') {
                    result.push(r);
                }
                else if (arr[1] == '<') {
                    for (var i = 0; i < r; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '<=') {
                    for (var i = 0; i <= r; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '>') {
                    for (var i = r + 1; i <= n; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '>=') {
                    for (var i = r; i <= n; i++) {
                        result.push(i);
                    }
                }
            }
            else if (this._isInteger(arr[0]) && this._isValidSymbol(arr[1]) &&
                this._isVariable(arr[2])) {
                r = +arr[0];
                if (r < 0 || r > n) {
                    throw new RangeError(r + ' is not in [0, ' + n + ']');
                }
                if (arr[1] == '=') {
                    result.push(r);
                }
                else if (arr[1] == '<') {
                    for (var i = r + 1; i <= n; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '<=') {
                    for (var i = r; i <= n; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '>') {
                    for (var i = 0; i < r; i++) {
                        result.push(i);
                    }
                }
                else if (arr[1] == '>=') {
                    for (var i = 0; i <= r; i++) {
                        result.push(i);
                    }
                }
            }
            else {
                throw new Error(s + ' is not a valid mathematical statement');
            }
        }
        else {
            if (this._isInteger(arr[0]) && this._isValidSymbol(arr[1]) &&
                this._isVariable(arr[2]) && this._isValidSymbol(arr[3]) &&
                this._isInteger(arr[4]) && arr[1] != '=' && arr[3] != '=') {
                var a = +arr[0];
                var b = +arr[4];
                if (a < b) {
                    if (arr[1] == '<' && arr[3] == '<' && b - a > 1) {
                        for (var i = a + 1; i < b; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '<' && arr[3] == '<=') {
                        for (var i = a + 1; i <= b; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '<=' && arr[3] == '<') {
                        for (var i = a; i < b; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '<=' && arr[3] == '<=') {
                        for (var i = a; i <= b; i++) {
                            result.push(i);
                        }
                    }
                    else {
                        throw new RangeError(s + ' is not a valid mathematical expression');
                    }
                }
                else if (a > b) {
                    if (arr[1] == '>' && arr[3] == '>' && a - b > 1) {
                        for (var i = b + 1; i < a; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '>' && arr[3] == '>=') {
                        for (var i = b; i < a; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '>=' && arr[3] == '>') {
                        for (var i = b + 1; i <= a; i++) {
                            result.push(i);
                        }
                    }
                    else if (arr[1] == '>=' && arr[3] == '>=') {
                        for (var i = b; i <= a; i++) {
                            result.push(i);
                        }
                    }
                    else {
                        throw new RangeError(s + ' is not a valid mathematical expression');
                    }
                }
                else {
                    throw new RangeError(s + ' is not a valid mathematical expression');
                }
            }
            else {
                throw new Error(s + ' is not a valid mathematical statement');
            }
        }
        return result;
    };
    /**
     * Return true if s is a letter between a and z.
     * @param {string} s - A possible variable.
     * @return {boolean} Return true if s is a letter between a and z.
     */
    Successes.prototype._isVariable = function (s) {
        return s.length == 1 && s >= 'A' && s <= 'z';
    };
    /**
     * Return true if s is an integer.
     * @param {string} s - A possible integer.
     * @return {boolean} Return true if s is an integer.
     */
    Successes.prototype._isInteger = function (s) {
        var i = +s;
        if (i % 1 == 0) {
            return true;
        }
        return false;
    };
    /**
     * Return true if s is a valid mathematical symbol.
     * @param {string} s - A possible mathematical symbol.
     * @return {boolean} Return true if s is a valid mathematical symbol.
     */
    Successes.prototype._isValidSymbol = function (s) {
        if (VALID_SYMBOLS.indexOf(s) >= 0) {
            return true;
        }
        return false;
    };
    return Successes;
}());
exports.Successes = Successes;
