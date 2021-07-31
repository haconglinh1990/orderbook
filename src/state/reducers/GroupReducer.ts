import {CHANGE_FEED, UPDATE_GROUP} from '../actions/ActionType';
import {productList} from '../../ultils/Constance';

export type GroupList = Array<number>;

export interface Group {
  currentProductId: string;
  groupList: GroupList;
  currentGroup: number;
}

const groupReducer = (
  state = productList[0],
  action: {type: string; payload: any},
): Group => {
  switch (action.type) {
    case UPDATE_GROUP:
      return {...state, currentGroup: action.payload};

    case CHANGE_FEED:
      return action.payload;
    default:
      return state;
  }
};

export type GroupState = ReturnType<typeof groupReducer>;

export default groupReducer;
