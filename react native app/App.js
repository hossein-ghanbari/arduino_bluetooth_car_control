import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Animated,
  StatusBar,
  StyleSheet,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

import KeyPad from './component/KeyPad';
import Info from './component/Info';
import BluetoothOption from './component/BluetoothOption';

import ModelView from 'react-native-gl-model-view';
const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const write = message => {
    BluetoothSerial.write(message);
  };

  const pressOut = () => {
    write('c');
  };

  const pressForward = () => {
    write('f');

    // for (let index = 0; index < 100; index++) {
    //   setY(prevState => prevState + 1);
    // }
    setInterval(() => {
      setY(prevState => prevState + 1);
    }, 0);
  };

  const pressBackward = () => {
    write('b');
  };

  const pressRight = () => {
    write('r');
    setInterval(() => {
      setX(prevState => prevState + 1);
    }, 1);
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

      <View style={{flex: 1, backgroundColor: 'red'}}>
        {/* <BluetoothOption />

      <Info /> */}

        <KeyPad
          pressOut={pressOut}
          pressForward={pressForward}
          pressBackward={pressBackward}
          pressRight={pressRight}
          pressLeft={pressLeft}
          pressLight={pressLight}
          pressHorn={pressHorn}
        />
      </View>

      <ModelView
        model={{
          uri: 'among_us.obj',
        }}
        texture={{
          uri: 'Plastic_4K_Diffuse.jpg',
        }}
        // flipTexture={true}
        scale={0.01}
        translateX={0}
        translateY={-1}
        translateZ={-2}
        rotateX={x}
        rotateY={y}
        rotateZ={z}
        animate={true}
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
