/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/chai/chai.d.ts' />

import {Successes} from '../src/Successes';
import {expect} from 'chai';
import {assert} from 'chai';

describe('Successes', () => {
  it('constructor(s: string, n: number)', () => {
    let successes: Successes;

    // test case 1: x o a, where o is a valid symbol
    successes = new Successes('x = 1', 5);
    expect(successes.toString()).to.equal('1');

    successes = new Successes('x < 1', 5);
    expect(successes.toString()).to.equal('0');

    successes = new Successes('x <= 1', 5);
    expect(successes.toString()).to.equal('0,1');

    successes = new Successes('x > 1', 5);
    expect(successes.toString()).to.equal('2,3,4,5');

    successes = new Successes('x >= 1', 5);
    expect(successes.toString()).to.equal('1,2,3,4,5');

    // test case 2: a o x, where o is a valid symbol
    successes = new Successes('1 > x', 5);
    expect(successes.toString()).to.equal('0');

    successes = new Successes('1 >= x', 5);
    expect(successes.toString()).to.equal('0,1');

    successes = new Successes('1 < x', 5);
    expect(successes.toString()).to.equal('2,3,4,5');

    successes = new Successes('1 <= x', 5);
    expect(successes.toString()).to.equal('1,2,3,4,5');

    // test case 3: a o x o b, where o is a valid symbol
    successes = new Successes('1 < x < 3', 5);
    expect(successes.toString()).to.equal('2');

    successes = new Successes('1 < x <= 3', 5);
    expect(successes.toString()).to.equal('2,3');

    successes = new Successes('1 <= x < 3', 5);
    expect(successes.toString()).to.equal('1,2');

    successes = new Successes('1 <= x <= 3', 5);
    expect(successes.toString()).to.equal('1,2,3');

    successes = new Successes('5 > x > 3', 5);
    expect(successes.toString()).to.equal('4');

    successes = new Successes('5 > x >= 3', 5);
    expect(successes.toString()).to.equal('3,4');

    successes = new Successes('5 >= x > 3', 5);
    expect(successes.toString()).to.equal('4,5');

    successes = new Successes('5 >= x >= 3', 5);
    expect(successes.toString()).to.equal('3,4,5');

    assert.throw(function() {
      new Successes('x <', 5);
    }, Error);

    assert.throw(function() {
      new Successes('x < a < 1', 5);
    }, Error);

    assert.throw(function() {
      new Successes('x = 10', 5);
    }, RangeError);

    assert.throw(function() {
      new Successes('x = -1', 5);
    }, RangeError);

    assert.throw(function() {
      new Successes('10 = x', 5);
    }, RangeError);

    assert.throw(function() {
      new Successes('-1 = x', 5);
    }, RangeError);

    assert.throw(function() {
      new Successes('1 = 2', 5);
    }, Error);

    assert.throw(function() {
      new Successes('1 = 2 < x', 5);
    }, Error);

    assert.throw(function() {
      new Successes('3 < x < 1', 5);
    }, RangeError);

    assert.throw(function() {
      new Successes('3 > x > 4', 5);
    }, RangeError);
  });

  it('toString(): string', () => {
    let successes: Successes;

    successes = new Successes('4 > x >= 3', 5);

    expect(successes.toString()).to.equal('3');

  });
});
