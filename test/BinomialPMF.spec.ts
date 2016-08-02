/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/chai/chai.d.ts' />

import {BinomialPMF} from '../src/BinomialPMF';
import {expect} from 'chai';
import {assert} from 'chai';

describe('BinomialPMF', () => {
  it('constructor(r: number, n: number, p: number)', () => {
    let r: number = 2;
    let n: number = 10;
    let p: number = 0.3;
    let pmf:BinomialPMF = new BinomialPMF(r, n, p);

    expect(pmf.toString()).to.equal('P(r = ' + r + ' | ' + n + ', ' + p + ')');

    // r and n must be non-negative

    assert.throw(function() {
      new BinomialPMF(-2, 10, 0.2);
    }, RangeError);

    assert.throw(function() {
      new BinomialPMF(2, -10, 0.2);
    }, RangeError);

    // r and n must be integers

    assert.throw(function() {
      new BinomialPMF(2.3, 10, 0.2);
    }, RangeError);

    assert.throw(function() {
      new BinomialPMF(2, 10.9, 0.2);
    }, RangeError);

    // r cannot be greater than n

    assert.throw(function() {
      new BinomialPMF(12, 10, 0.2);
    }, RangeError);

    // p in [0, 1]

    assert.throw(function() {
      new BinomialPMF(1, 10, 1.3);
    }, RangeError);

    assert.throw(function() {
      new BinomialPMF(1, 10, -0.1);
    }, RangeError);

  });

  it('getProbability(): number', () => {
    let pmf:BinomialPMF = new BinomialPMF(0, 3, 0.5);
    // r = 0
    expect(pmf.getProbability()).to.equal(0.125);

    // r = 1
    pmf.setR(1);
    expect(pmf.getProbability()).to.equal(0.375);

    // r = 2
    pmf.setR(2);
    expect(pmf.getProbability()).to.equal(0.375);

    // r = 3
    pmf.setR(3);
    expect(pmf.getProbability()).to.equal(0.125);
  });

  it('toString(): string', () => {
    let r: number = 4;
    let n: number = 20;
    let p: number = 0.8;
    let pmf:BinomialPMF = new BinomialPMF(r, n, p);

    expect(pmf.toString()).to.equal('P(r = ' + r + ' | ' + n + ', ' + p + ')');
  });

});
