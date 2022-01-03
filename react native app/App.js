import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  StatusBar,
  StyleSheet,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

import KeyPad from './component/KeyPad';
import Info from './component/Info';
import BluetoothOption from './component/BluetoothOption';

import ModelView from 'react-native-gl-model-view';
import CardModel from './component/CarModal';

const App = () => {
  const [x, setX] = useState(-75);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(180);
  const write = message => {
    BluetoothSerial.write(message);
  };

  const pressOut = () => {
    write('c');
  };

  const pressForward = () => {
    write('f');
    // setY(prevState => prevState + 5);

    setInterval(() => {
      setY(prevState => prevState + 1);
    }, 0);
  };

  const pressBackward = () => {
    write('b');
  };

  const pressRight = () => {
    write('r');
    setX(prevState => prevState + 5);

    // setInterval(() => {
    //   setX(prevState => prevState + 1);
    // }, 1);
  };

  const pressLeft = () => {
    write('l');
    setZ(prevState => prevState + 5);
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

      <ScrollView>
        <CardModel x={x} y={y} z={z} />

        {/* <BluetoothOption /> */}

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
      </ScrollView>
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
