import {Order, Orders} from '../state/reducers/OrderBookReducer';

export const mergeReplaceSortAndCleanOrder = (
  currentArray: Orders,
  newArray: Orders,
  isAsk: boolean,
) =>
  currentArray
    .filter((cr: Order) => !newArray.find((na: Order) => na[0] === cr[0]))
    .concat(newArray)
    .sort((a: Order, b) => (isAsk ? a[0] - b[0] : b[0] - a[0]))
    .filter((cr: Order) => cr[1] > 0);

/*Note at here:
the original input of bid list decrease, and the original ask increase*/
export const groupLimitAndAddTotalPrice = (
  array: Orders,
  isAsk: boolean,
  group: number,
  maxItem: number = 13,
) =>
  array // group price by group value
    .reduce((result: Orders, current: Order) => {
      const priceGrouped = Math.floor(current[0] / group) * group;
      const formatPrice = Number(priceGrouped.toFixed(getFixedDecimal(group)));
      const search = result.findIndex(rs => rs[0] === formatPrice);
      if (search === -1) {
        result.push([formatPrice, current[1]]);
      } else {
        result[search][1] = result[search][1] + current[1];
      }
      return result;
    }, []) // take top maxItem value of the list
    .filter((result: Order, index: number, source: Orders) =>
      isAsk ? index >= source.length - 1 - (maxItem - 1) : index <= maxItem - 1,
    ) // add total field to array
    .reduceRight(
      (
        result: Orders,
        current: Order,
        currentIndex: number,
        source: Orders,
      ) => {
        if (result.length === 0) {
          current.push(current[1]);
        } else {
          current.push(current[1] + source[currentIndex + 1][2]);
        }
        result.push(current);
        return result;
      },
      [],
    ); /* cause the reduceRight so the output of bid list increase now,
    and the ask list decrease*/

export const getFixedDecimal = (currentGroup: number) => {
  if (currentGroup % 1 !== 0) {
    return currentGroup.toString().split('.')[1].length;
  } else {
    return 0;
  }
};
