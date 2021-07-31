import React, {useEffect, useState} from 'react';
import {Dimensions, ScaledSize, StyleSheet, View} from 'react-native';
import GroupSelect from '../components/GroupSelect';
import {useDispatch} from 'react-redux';
import {CHANGE_FEED} from '../state/actions/ActionType';
import ActionsButton from '../components/ActionsButton';
import {productList} from '../ultils/Constance';
import DeviceInfo from 'react-native-device-info';
import AskVisualization from '../components/AskVisualization';
import BidVisualization from '../components/BidVisualization';

let dim: ScaledSize = Dimensions.get('window');
const isTablet: boolean = DeviceInfo.isTablet();
const AppContainer = () => {
  const [isTabLetLandscape, setTabLetLandscape] = useState(
    isTablet && dim.width >= dim.height,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      dim = Dimensions.get('window');
      setTabLetLandscape(isTablet && dim.width >= dim.height);
    });
    const action = {type: CHANGE_FEED, payload: productList[0]};
    dispatch(action);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <GroupSelect />
      <View
        style={{
          flex: 1,
          flexDirection: isTabLetLandscape ? 'row-reverse' : 'column',
        }}>
        <BidVisualization isDesktopUI={isTabLetLandscape} />
        <AskVisualization isDesktopUI={isTabLetLandscape} />
      </View>
      <ActionsButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});

export default AppContainer;
