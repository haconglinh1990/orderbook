import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const VisualHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>PRICE</Text>
      <Text style={styles.titleText}>SIZE</Text>
      <Text style={styles.titleText}>TOTAL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    color: 'grey',
    height: 20,
    marginBottom: 10,
    marginRight: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default VisualHeader;
