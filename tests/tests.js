const chai = require('chai');
const expect = chai.expect;

import { MAX_COORD, MAX_INSTRUCTION } from '../src/js/config';

describe('Arithmetic', () => {
  it('should calculate 1 + 1 correctly', () => {
    const expectedResult = 2;

    expect(1 + 1).to.equal(expectedResult);
  });
});

describe('config.js', () => {
  it('should show max coords as 50', () => {
    expect(MAX_COORD).to.equal(50);
  });
  
  it('should show max instruction as 100', () => {
    expect(MAX_INSTRUCTION).to.equal(100);
  });
});