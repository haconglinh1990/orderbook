import {combineReducers} from 'redux';
import groupReducer from './GroupReducer';
import orderBookReducer from './OrderBookReducer';

const rootReducer = combineReducers({
  group: groupReducer,
  orderBook: orderBookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
