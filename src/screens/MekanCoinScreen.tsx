import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MekanCoinScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen 🏠</Text>
    </View>
  );
};

export default MekanCoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
