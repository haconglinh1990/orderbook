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

const BidVisualization = ({isDesktopUI}: {isDesktopUI: boolean}) => {
  const bids: Orders = useSelector((state: RootState) => state.orderBook.bids);
  const currentGroup: number = useSelector(
    (state: RootState) => state.group.currentGroup,
  );

  let groupedBids = groupLimitAndAddTotalPrice(
    bids,
    false,
    currentGroup,
    isDesktopUI ? 15 : 13,
  );

  const highestTotal =
    groupedBids.length > 0 ? groupedBids[groupedBids.length - 1][2] : 0;
  groupedBids = isDesktopUI ? groupedBids : groupedBids.reverse();
  const renderItem: ListRenderItem<Order> = ({item}) => {
    const percentage: string = Math.round((100 * item[2]) / highestTotal) + '%';
    return (
      <View style={{...styles.row, height: isDesktopUI ? 45 : 20}}>
        <View
          style={{
            ...styles.colorBar,
            backgroundColor: '#1f5153',
            left: isDesktopUI ? 0 : undefined,
            right: isDesktopUI ? undefined : 0,
            width: percentage,
            height: isDesktopUI ? 46 : 20,
          }}
        />
        <Text style={{...styles.textStyle, color: '#3f8a6a'}}>
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
        height: isDesktopUI ? '100%' : '50%',
        width: isDesktopUI ? '50%' : '100%',
      }}>
      <VisualHeader />
      {groupedBids.length > 0 ? (
        <FlatList<Order>
          scrollEnabled={true}
          data={groupedBids}
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
  },
  colorBarBidDesktop: {
    height: '100%',
    position: 'absolute',
  },
});

export default BidVisualization;
