import {Orders} from '../../src/state/reducers/OrderBookReducer';
import {groupLimitAndAddTotalPrice} from '../../src/ultils/HelperFunctions';

describe('groupLimitAndAddTotalPrice', () => {
  it('Should return correct when input is empty', () => {
    const inputArray: Orders = [];
    const group: number = 0.5;
    const isAsk: boolean = false;
    const maxItem: number = 13;
    const result: Orders = [];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should return correct group bid price', () => {
    const inputArray: Orders = [
      [5, 100],
      [4, 100],
      [3, 200],
      [1, 200],
    ];
    const group: number = 2;
    const isAsk: boolean = false;
    const maxItem: number = 13;
    const result: Orders = [
      [0, 200, 200],
      [2, 200, 400],
      [4, 200, 600],
    ];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should return correct group bid price float number', () => {
    const inputArray: Orders = [
      [0.2, 100],
      [0.16, 100],
      [0.12, 100],
      [0.1, 100],
      [0.06, 200],
      [0.05, 300],
    ];
    const group: number = 0.05;
    const isAsk: boolean = false;
    const maxItem: number = 13;
    const result: Orders = [
      [0.05, 500, 500],
      [0.1, 200, 700],
      [0.15, 100, 800],
      [0.2, 100, 900],
    ];

    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should return correct group ask price float number', () => {
    const inputArray: Orders = [
      [0.05, 300],
      [0.06, 200],
      [0.1, 100],
      [0.12, 100],
      [0.16, 100],
      [0.2, 100],
    ];
    const group: number = 0.05;
    const isAsk: boolean = true;
    const maxItem: number = 13;
    const result: Orders = [
      [0.2, 100, 100],
      [0.15, 100, 200],
      [0.1, 200, 400],
      [0.05, 500, 900],
    ];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should correct cut the bid list', () => {
    const inputArray: Orders = [
      [6, 100],
      [5, 100],
      [4, 100],
      [3, 100],
      [2, 100],
      [1, 100],
    ];
    const group: number = 1;
    const isAsk: boolean = false;
    const maxItem: number = 3;
    const result: Orders = [
      [4, 100, 100],
      [5, 100, 200],
      [6, 100, 300],
    ];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should correct cut the ask list', () => {
    const inputArray: Orders = [
      [1, 100],
      [2, 100],
      [3, 100],
      [4, 100],
      [5, 100],
      [6, 100],
    ];
    const group: number = 1;
    const isAsk: boolean = false;
    const maxItem: number = 4;
    const result: Orders = [
      [4, 100, 100],
      [3, 100, 200],
      [2, 100, 300],
      [1, 100, 400],
    ];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });

  it('Should return correct total number', () => {
    const inputArray: Orders = [
      [1, 500],
      [2, 400],
      [3, 300],
      [4, 200],
      [5, 100],
    ];
    const group: number = 1;
    const isAsk: boolean = true;
    const maxItem: number = 13;
    const result: Orders = [
      [5, 100, 100],
      [4, 200, 300],
      [3, 300, 600],
      [2, 400, 1000],
      [1, 500, 1500],
    ];
    expect(
      groupLimitAndAddTotalPrice(inputArray, isAsk, group, maxItem),
    ).toEqual(result);
  });
});
