import sampleFunc from '../server/sampleFunc';

describe('sampleFunc', () => {
  it('returns correct value', () => {
    expect(sampleFunc(1,1)).toEqual(2);
    // expect(sampleFunc(1,1)).toBeInstanceOf(Number);
  });
});