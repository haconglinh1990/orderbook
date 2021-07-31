import {Orders} from '../../src/state/reducers/OrderBookReducer';
import {mergeReplaceSortAndCleanOrder} from '../../src/ultils/HelperFunctions';

describe('mergeReplaceAndSortOrder', () => {
  it('Should return correct when two input empty', () => {
    const currentArray: Orders = [];
    const newArray: Orders = [];
    const result: Orders = [];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });

  it('Should return correct when new array empty', () => {
    const currentArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    const newArray: Orders = [];
    const result: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });
  it('Should return correct when current empty', () => {
    const currentArray: Orders = [];
    const newArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    const result: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });
  it('Should return correct when new array contain all new price', () => {
    const currentArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    const newArray: Orders = [
      [40192, 1200],
      [40195.5, 2500],
    ];
    const result: Orders = [
      [40191, 11587],
      [40192, 1200],
      [40192.5, 1200],
      [40193.5, 2500],
      [40195.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });
  it('Should return correct when new array had all updated data', () => {
    const currentArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
      [40193.5, 2500],
    ];
    const newArray: Orders = [
      [40191, 1500],
      [40192.5, 2500],
    ];
    const result: Orders = [
      [40191, 1500],
      [40192.5, 2500],
      [40193.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });
  it('Should return correct when new array mixed data', () => {
    const currentArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
    ];
    const newArray: Orders = [
      [40192, 1200],
      [40192.5, 2000],
      [40193.5, 2500],
    ];
    const result: Orders = [
      [40191, 11587],
      [40192, 1200],
      [40192.5, 2000],
      [40193.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });

  it('Should sorted correct when apply to bid order', () => {
    const currentArray: Orders = [
      [40191, 11587],
      [40192.5, 1200],
    ];
    const newArray: Orders = [
      [40192, 1200],
      [40192.5, 2000],
      [40193.5, 2500],
    ];
    const result: Orders = [
      [40193.5, 2500],
      [40192.5, 2000],
      [40192, 1200],
      [40191, 11587],
    ];
    expect(
      mergeReplaceSortAndCleanOrder(currentArray, newArray, false),
    ).toEqual(result);
  });

  it('Should remove element has size empty', () => {
    const currentArray: Orders = [
      [40191, 0],
      [40192.5, 2344],
    ];
    const newArray: Orders = [
      [40192, 1200],
      [40192.5, 0],
      [40193.5, 2500],
    ];
    const result: Orders = [
      [40192, 1200],
      [40193.5, 2500],
    ];
    expect(mergeReplaceSortAndCleanOrder(currentArray, newArray, true)).toEqual(
      result,
    );
  });
});
