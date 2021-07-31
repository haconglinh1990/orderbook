import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/reducers';
import {Group} from '../state/reducers/GroupReducer';
import {UPDATE_GROUP} from '../state/actions/ActionType';

const GroupSelect = () => {
  const group: Group = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();

  const selectedItem = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      dispatch({type: UPDATE_GROUP, payload: group.groupList[index.row]});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Book</Text>
      <Select
        style={styles.select}
        value={'Group ' + group.currentGroup}
        selectedIndex={new IndexPath(group.currentGroup)}
        onSelect={selectedItem}>
        {group.groupList.map((gr, index) => (
          <SelectItem title={gr} key={index} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius: 1,
    borderStyle: 'solid',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  select: {
    width: 160,
  },
});

export default GroupSelect;
