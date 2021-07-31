import {UPDATE_ORDER, UPDATE_ORDER_ERROR} from '../actions/ActionType';
import {mergeReplaceSortAndCleanOrder} from '../../ultils/HelperFunctions';

export type Order = Array<number>;
export type Orders = Array<Order>;

export type OrderBook = {
  asks: Orders;
  bids: Orders;
  feed: string;
  product_id: string;
  error_message: string;
};

export const initialState = {
  asks: [],
  bids: [],
  feed: 'book_ui_1',
  product_id: 'PI_XBTUSD',
  error_message: '',
};

const orderBookReducer = (
  state: OrderBook = initialState,
  action: {type: string; payload: any},
): OrderBook => {
  switch (action.type) {
    case UPDATE_ORDER:
      if (action.payload.feed === 'book_ui_1_snapshot') {
        return action.payload;
      } else {
        return {
          ...state,
          asks: mergeReplaceSortAndCleanOrder(
            state.asks,
            action.payload.asks,
            true,
          ),
          bids: mergeReplaceSortAndCleanOrder(
            state.bids,
            action.payload.bids,
            false,
          ),
          feed: action.payload.feed,
          product_id: action.payload.product_id,
        };
      }

    case UPDATE_ORDER_ERROR:
      return {...state, error_message: action.payload};
    default:
      return state;
  }
};

export type OderBookState = ReturnType<typeof orderBookReducer>;

export default orderBookReducer;
