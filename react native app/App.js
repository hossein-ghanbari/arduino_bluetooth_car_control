import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

import KeyPad from './component/KeyPad';
import Info from './component/Info';
import BluetoothOption from './component/BluetoothOption';

import ModelView from 'react-native-gl-model-view';

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

      {/* <BluetoothOption />

      <Info />

      <KeyPad
        pressOut={pressOut}
        pressForward={pressForward}
        pressBackward={pressBackward}
        pressRight={pressRight}
        pressLeft={pressLeft}
        pressLight={pressLight}
        pressHorn={pressHorn}
      /> */}

      <ModelView
        model={{
          uri: 'amongUs.obj',
        }}
        // texture={{
        //   uri: 'texture.png',
        // }}
        scale={0.01}
        translateZ={-2}
        rotateX={10}
        rotateY={10}
        rotateZ={10}
        style={{flex: 1}}
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
