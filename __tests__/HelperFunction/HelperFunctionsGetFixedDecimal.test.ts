import {getFixedDecimal} from '../../src/ultils/HelperFunctions';

describe('getFixedDecimal', () => {
  it('Should return correct decimal number', () => {
    let currentGroup: number = 0.05;
    let result: number = 2;
    expect(getFixedDecimal(currentGroup)).toEqual(result);

    currentGroup = 1;
    result = 0;
    expect(getFixedDecimal(currentGroup)).toEqual(result);

    currentGroup = 1.5;
    result = 1;
    expect(getFixedDecimal(currentGroup)).toEqual(result);

    currentGroup = 0.5;
    result = 1;
    expect(getFixedDecimal(currentGroup)).toEqual(result);

    currentGroup = 2;
    result = 0;
    expect(getFixedDecimal(currentGroup)).toEqual(result);
  });
});
