import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';

const KeyPad = () => {
  return (
    <>
      <View style={styles.keyPad}>
        <View style={styles.optBtnRow}>
          <Pressable
            style={styles.optBtn}
            onPressIn={() => console.log('on press in')}
            onPressOut={() => console.log('on press out')}
            android_ripple={{color: '#6C1D6E'}}>
            <Text style={styles.optBtnText}>💡</Text>
          </Pressable>

          <Pressable
            style={styles.optBtn}
            onPressIn={() => console.log('on press in')}
            onPressOut={() => console.log('on press out')}
            android_ripple={{color: '#6C1D6E'}}>
            <Text style={styles.optBtnText}>🔊</Text>
          </Pressable>
        </View>

        <View style={styles.arrow}>
          <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
            <Text style={styles.btnText}>△</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
              <Text style={styles.btnText}>◁</Text>
            </TouchableOpacity>

            <View style={styles.btnEmpty} />
            <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
              <Text style={styles.btnText}>▷</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
            <Text style={styles.btnText}>▽</Text>
          </TouchableOpacity>
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
