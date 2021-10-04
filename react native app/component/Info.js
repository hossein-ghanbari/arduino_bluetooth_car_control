import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const Info = () => {
  const [msg, setMsg] = useState({
    heartBeat: 0,
    temperature: 0,
    lightSensor: null,
  });

  useEffect(() => {
    BluetoothSerial.withDelimiter('\r').then(() => {
      BluetoothSerial.on('read', data => {
        if (data?.data?.includes('temp:')) {
          let value = '';
          value = data?.data?.replace('temp:', '')?.trim();
          setMsg(prevState => {
            return {...prevState, temperature: value};
          });
        }
        if (data?.data?.includes('heartBeat:')) {
          let value = '';
          value = data?.data?.replace('heartBeat:', '')?.trim();
          setMsg(prevState => {
            return {...prevState, heartBeat: value};
          });
        }
        if (data?.data?.includes('lightSensor:')) {
          let value = '';
          value = data?.data?.replace('lightSensor:', '')?.trim();
          setMsg(prevState => {
            return {...prevState, lightSensor: value};
          });
        }
      });
    });
  }, []);

  return (
    <View style={styles.info}>
      <Text style={styles.infoItem}>
        ♥ : {msg?.heartBeat > 10 ? msg?.heartBeat : 0}
      </Text>
      <Text style={styles.infoItem}>
        🌡 : {Number(msg?.temperature)?.toFixed()}c
      </Text>
      <Text style={styles.infoItem}>
        🕒 : {msg?.lightSensor > 15 ? 'Day' : 'Night'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    paddingBottom: 30,
    marginVertical: 30,
    borderBottomColor: '#6C1D6E',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  infoItem: {
    fontSize: 16,
    color: '#555',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#6C1D6E',
    paddingHorizontal: 10,
    height: 50,
    minWidth: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Info;
