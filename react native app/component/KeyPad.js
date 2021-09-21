import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const KeyPad = ({
  pressOut,
  pressForward,
  pressBackward,
  pressRight,
  pressLeft,
  pressLight,
  pressHorn,
}) => {
  return (
    <>
      <View style={styles.keyPad}>
        <View style={styles.optBtnRow}>
          <Pressable
            style={styles.optBtn}
            onPressIn={pressLight}
            onPressOut={pressOut}
            android_ripple={{color: '#6C1D6E'}}>
            <Text style={styles.optBtnText}>💡</Text>
          </Pressable>

          <Pressable
            style={styles.optBtn}
            onPressIn={pressHorn}
            onPressOut={pressOut}
            android_ripple={{color: '#6C1D6E'}}>
            <Text style={styles.optBtnText}>🔊</Text>
          </Pressable>
        </View>

        <View style={styles.arrow}>
          <Pressable
            style={styles.btn}
            onPressIn={pressForward}
            onPressOut={pressOut}
            android_ripple={{color: '#fff'}}>
            <Text style={styles.btnText}>△</Text>
          </Pressable>

          <View style={styles.row}>
            <Pressable
              style={styles.btn}
              onPressIn={pressLeft}
              onPressOut={pressOut}
              android_ripple={{color: '#fff'}}>
              <Text style={styles.btnText}>◁</Text>
            </Pressable>

            <View style={styles.btnEmpty} />
            <Pressable
              style={styles.btn}
              onPressIn={pressRight}
              onPressOut={pressOut}
              android_ripple={{color: '#fff'}}>
              <Text style={styles.btnText}>▷</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.btn}
            onPressIn={pressBackward}
            onPressOut={pressOut}
            android_ripple={{color: '#fff'}}>
            <Text style={styles.btnText}>▽</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  keyPad: {},
  optBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    marginBottom: 30,
    borderBottomColor: '#6C1D6E',
    borderBottomWidth: 1,
  },
  optBtn: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#6C1D6E',
    marginHorizontal: 5,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optBtnText: {
    color: '#fff',
    fontSize: 30,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#6C1D6E',
    borderRadius: 6,
    margin: 2,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 34,
  },
  btnEmpty: {
    height: 60,
    width: 60,
  },
});

export default KeyPad;
