import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';
import {CHANGE_FEED, KILL_FEED} from '../state/actions/ActionType';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/reducers';
import {productList} from '../ultils/Constance';
import {Group} from '../state/reducers/GroupReducer';

const ActionsButton = () => {
  const dispatch = useDispatch();

  const group: Group = useSelector((state: RootState) => state.group);
  const [isError, setIsError] = useState(true);

  const toggleFeed = () => {
    const action = {
      type: CHANGE_FEED,
      payload: productList.find(
        (pro: Group) => pro.currentProductId !== group.currentProductId,
      ),
    };
    dispatch(action);
  };
  const killFeed = () => {
    if (isError) {
      // console.log("killFeed", isError)
      dispatch({type: KILL_FEED});
      setIsError(false);
    } else {
      const action = {
        type: CHANGE_FEED,
        payload: productList.find(
          (pro: Group) => pro.currentProductId === group.currentProductId,
        ),
      };
      dispatch(action);
      setIsError(true);
    }
  };
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        status="primary"
        size="small"
        accessoryLeft={<Icon name="swap-outline" />}
        onPress={toggleFeed}>
        Toggle Feed
      </Button>

      <Button
        style={styles.button}
        status="danger"
        size="small"
        accessoryLeft={<Icon name="alert-circle-outline" />}
        onPress={killFeed}>
        Kill Feed
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262d3b',
  },
  button: {
    margin: 4,
  },
  select: {
    width: 160,
  },
});

export default ActionsButton;
