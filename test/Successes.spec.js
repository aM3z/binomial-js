/// <reference path='../typings/mocha/mocha.d.ts' />
/// <reference path='../typings/chai/chai.d.ts' />
"use strict";
var Successes_1 = require('../src/Successes');
var chai_1 = require('chai');
var chai_2 = require('chai');
describe('Successes', function () {
    it('constructor(s: string, n: number)', function () {
        var successes;
        // test case 1: x o a, where o is a valid symbol
        successes = new Successes_1.Successes('x = 1', 5);
        chai_1.expect(successes.toString()).to.equal('1');
        successes = new Successes_1.Successes('x < 1', 5);
        chai_1.expect(successes.toString()).to.equal('0');
        successes = new Successes_1.Successes('x <= 1', 5);
        chai_1.expect(successes.toString()).to.equal('0,1');
        successes = new Successes_1.Successes('x > 1', 5);
        chai_1.expect(successes.toString()).to.equal('2,3,4,5');
        successes = new Successes_1.Successes('x >= 1', 5);
        chai_1.expect(successes.toString()).to.equal('1,2,3,4,5');
        // test case 2: a o x, where o is a valid symbol
        successes = new Successes_1.Successes('1 > x', 5);
        chai_1.expect(successes.toString()).to.equal('0');
        successes = new Successes_1.Successes('1 >= x', 5);
        chai_1.expect(successes.toString()).to.equal('0,1');
        successes = new Successes_1.Successes('1 < x', 5);
        chai_1.expect(successes.toString()).to.equal('2,3,4,5');
        successes = new Successes_1.Successes('1 <= x', 5);
        chai_1.expect(successes.toString()).to.equal('1,2,3,4,5');
        // test case 3: a o x o b, where o is a valid symbol
        successes = new Successes_1.Successes('1 < x < 3', 5);
        chai_1.expect(successes.toString()).to.equal('2');
        successes = new Successes_1.Successes('1 < x <= 3', 5);
        chai_1.expect(successes.toString()).to.equal('2,3');
        successes = new Successes_1.Successes('1 <= x < 3', 5);
        chai_1.expect(successes.toString()).to.equal('1,2');
        successes = new Successes_1.Successes('1 <= x <= 3', 5);
        chai_1.expect(successes.toString()).to.equal('1,2,3');
        successes = new Successes_1.Successes('5 > x > 3', 5);
        chai_1.expect(successes.toString()).to.equal('4');
        successes = new Successes_1.Successes('5 > x >= 3', 5);
        chai_1.expect(successes.toString()).to.equal('3,4');
        successes = new Successes_1.Successes('5 >= x > 3', 5);
        chai_1.expect(successes.toString()).to.equal('4,5');
        successes = new Successes_1.Successes('5 >= x >= 3', 5);
        chai_1.expect(successes.toString()).to.equal('3,4,5');
        chai_2.assert.throw(function () {
            new Successes_1.Successes('x <', 5);
        }, Error);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('x < a < 1', 5);
        }, Error);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('x = 10', 5);
        }, RangeError);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('x = -1', 5);
        }, RangeError);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('10 = x', 5);
        }, RangeError);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('-1 = x', 5);
        }, RangeError);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('1 = 2', 5);
        }, Error);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('1 = 2 < x', 5);
        }, Error);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('3 < x < 1', 5);
        }, RangeError);
        chai_2.assert.throw(function () {
            new Successes_1.Successes('3 > x > 4', 5);
        }, RangeError);
    });
    it('toString(): string', function () {
        var successes;
        successes = new Successes_1.Successes('4 > x >= 3', 5);
        chai_1.expect(successes.toString()).to.equal('3');
    });
});
