import React from 'react';
import {StyleSheet} from 'react-native';
import ModelView from 'react-native-gl-model-view';

const CardModel = ({x, y, z}) => {
  return (
    <ModelView
      model={{
        uri: 'Sportscar_Car.obj',
      }}
      texture={{
        uri: 'Sportscar_Car.jpg',
      }}
      flipTexture={true}
      scale={0.0035}
      translateX={-0.14}
      translateY={0.2}
      translateZ={-2}
      rotateX={x}
      rotateY={y}
      rotateZ={z}
      animate={true}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
  },
});

export default CardModel;
