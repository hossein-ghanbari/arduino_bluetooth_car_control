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
    write('c');
  };

  const pressForward = () => {
    write('f');
  };

  const pressBackward = () => {
    write('b');
  };

  const pressRight = () => {
    write('r');
  };

  const pressLeft = () => {
    write('l');
  };

  const pressLight = () => {
    write('n');
  };

  const pressHorn = () => {
    write('h');
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
