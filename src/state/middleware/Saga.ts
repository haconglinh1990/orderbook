import {
  call,
  cancelled,
  delay,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {
  CHANGE_FEED,
  KILL_FEED,
  UPDATE_ORDER,
  UPDATE_ORDER_ERROR,
} from '../actions/ActionType';

const createSocketChannel = (productId: string, isError?: boolean) =>
  eventChannel(emit => {
    const socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    socket.onopen = () =>
      socket.send(
        `{"event":"subscribe","feed":"book_ui_1","product_ids":["${productId}"]}`,
      );

    socket.onmessage = e => {
      try {
        const order = JSON.parse(e.data);
        if (isError) {
          socket.close();
          return emit(new Error('Error simulate by developer !'));
        }
        if (order.asks && order.bids) {
          return emit(order);
        }
      } catch (er) {
        socket.close();
        return emit(new Error(`Error parsing : ${e.data}`));
      }
    };

    socket.onclose = () =>
      socket.send(
        `{"event":"unsubscribe","feed":"book_ui_1","product_ids":["${productId}"]}`,
      );

    socket.onerror = error => {
      console.log('socket.onmessage Error', error);
      socket.close();
      return emit(new Error(error.message));
    };

    return () => {
      socket.close();
    };
  });

let channel: any = null;
function* subscribeOrderBookSaga(action: {type: string; payload: any}) {
  if (channel) {
    channel.close();
  }
  const currentProductId = yield select(state => state.group.currentProductId);

  channel = yield call(
    createSocketChannel,
    currentProductId,
    action.type === KILL_FEED,
  );

  while (true) {
    try {
      const newOrderBook = yield take(channel);
      yield put({type: UPDATE_ORDER, payload: newOrderBook});
      yield delay(500);
    } catch (error) {
      yield put({type: UPDATE_ORDER_ERROR, payload: error.message});
      // console.log('catch Error', error.message);
      // Alert.alert('Error ', error.message);
      if (yield cancelled()) {
        channel.close();
      }
    }
  }
}

function* rootSaga() {
  yield takeLatest([CHANGE_FEED, KILL_FEED], subscribeOrderBookSaga);
}
export default rootSaga;
