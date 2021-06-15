import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import KeyPad from './component/KeyPad';
import Info from './component/Info';
import BluetoothOption from './component/BluetoothOption';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor="#6C1D6E" />
      <BluetoothOption />
      <Info />
      <KeyPad />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
});

export default App;
