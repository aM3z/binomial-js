/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/chai/chai.d.ts' />
"use strict";
var BinomialPMF_1 = require('../src/BinomialPMF');
var chai_1 = require('chai');
var chai_2 = require('chai');
describe('BinomialPMF', function () {
    it('constructor(r: number, n: number, p: number)', function () {
        var r = 2;
        var n = 10;
        var p = 0.3;
        var pmf = new BinomialPMF_1.BinomialPMF(r, n, p);
        chai_1.expect(pmf.toString()).to.equal('P(r = ' + r + ' | ' + n + ', ' + p + ')');
        // r and n must be non-negative
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(-2, 10, 0.2);
        }, RangeError);
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(2, -10, 0.2);
        }, RangeError);
        // r and n must be integers
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(2.3, 10, 0.2);
        }, RangeError);
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(2, 10.9, 0.2);
        }, RangeError);
        // r cannot be greater than n
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(12, 10, 0.2);
        }, RangeError);
        // p in [0, 1]
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(1, 10, 1.3);
        }, RangeError);
        chai_2.assert.throw(function () {
            new BinomialPMF_1.BinomialPMF(1, 10, -0.1);
        }, RangeError);
    });
    it('getProbability(): number', function () {
        var pmf = new BinomialPMF_1.BinomialPMF(0, 3, 0.5);
        // r = 0
        chai_1.expect(pmf.getProbability()).to.equal(0.125);
        // r = 1
        pmf.setR(1);
        chai_1.expect(pmf.getProbability()).to.equal(0.375);
        // r = 2
        pmf.setR(2);
        chai_1.expect(pmf.getProbability()).to.equal(0.375);
        // r = 3
        pmf.setR(3);
        chai_1.expect(pmf.getProbability()).to.equal(0.125);
    });
    it('toString(): string', function () {
        var r = 4;
        var n = 20;
        var p = 0.8;
        var pmf = new BinomialPMF_1.BinomialPMF(r, n, p);
        chai_1.expect(pmf.toString()).to.equal('P(r = ' + r + ' | ' + n + ', ' + p + ')');
    });
});
