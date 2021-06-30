import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

import KeyPad from './component/KeyPad';
import Info from './component/Info';
import BluetoothOption from './component/BluetoothOption';

const App = () => {
  const write = message => {
    BluetoothSerial.write(message);
  };

  const pressOut = () => {
    write('CLEAR');
  };

  const pressForward = () => {
    write('FORWARD');
  };

  const pressBackward = () => {
    write('BACKWARD');
  };

  const pressRight = () => {
    write('RIGHT');
  };

  const pressLeft = () => {
    write('LEFT');
  };

  const pressLight = () => {
    write('LIGHT');
  };

  const pressHorn = () => {
    write('HORN');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor="#6C1D6E" />

      <BluetoothOption />

      <Info />

      <KeyPad
        pressOut={pressOut}
        pressForward={pressForward}
        pressBackward={pressBackward}
        pressRight={pressRight}
        pressLeft={pressLeft}
        pressLight={pressLight}
        pressHorn={pressHorn}
      />
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
