import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Order, Orders} from '../state/reducers/OrderBookReducer';
import {useSelector} from 'react-redux';
import {RootState} from '../state/reducers';
import {
  getFixedDecimal,
  groupLimitAndAddTotalPrice,
} from '../ultils/HelperFunctions';
import VisualHeader from './VisualHeader';
import SpinnerComponent from './SpinnerComponent';

const AskVisualization = ({isDesktopUI}: {isDesktopUI: boolean}) => {
  const asks: Orders = useSelector((state: RootState) => state.orderBook.asks);
  const currentGroup: number = useSelector(
    (state: RootState) => state.group.currentGroup,
  );

  const groupedAsks = groupLimitAndAddTotalPrice(
    asks,
    true,
    currentGroup,
    isDesktopUI ? 15 : 13,
  );

  const highestTotal =
    groupedAsks.length > 0 ? groupedAsks[groupedAsks.length - 1][2] : 0;

  const renderItem: ListRenderItem<Order> = ({item}) => {
    const percentage: string = Math.round((100 * item[2]) / highestTotal) + '%';
    return (
      <View style={{...styles.row, height: isDesktopUI ? 45 : 20}}>
        <View
          style={{
            ...styles.colorBar,
            width: percentage,
            height: isDesktopUI ? 46 : 20,
          }}
        />
        <Text style={{...styles.textStyle, color: '#b64543'}}>
          {item[0].toFixed(getFixedDecimal(currentGroup))}
        </Text>
        <Text style={styles.textStyle}>{item[1]}</Text>
        <Text style={styles.textStyle}>{item[2]}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        ...styles.container,
        height: isDesktopUI ? '100%' : '45%',
        width: isDesktopUI ? '50%' : '100%',
      }}>
      {isDesktopUI && <VisualHeader />}
      {asks.length > 0 ? (
        <FlatList<Order>
          scrollEnabled={true}
          data={groupedAsks}
          renderItem={renderItem}
          keyExtractor={item => `${item[0]}`}
        />
      ) : (
        <SpinnerComponent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  textStyle: {
    flex: 1,
    height: '100%',
    marginRight: 20,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'Roboto',
  },
  colorBar: {
    height: '100%',
    position: 'absolute',
    backgroundColor: '#482835',
    right: 0,
  },
});

export default AskVisualization;
