import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from '@ui-kitten/components';

const SpinnerComponent = () => {
  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinnerComponent;
