import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const Info = () => {
  const [msg, setMsg] = useState({
    status: '',
    heartBeat: 0,
    temperature: 0,
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
      });
    });
  }, []);

  return (
    <View style={styles.info}>
      <Text style={styles.infoItem}>Heart Beat : {msg?.heartBeat}</Text>
      <Text style={styles.infoItem}>Temperature : {msg?.temperature}c</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    fontSize: 18,
    color: '#555',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#6C1D6E',
    // padding: 10,
    height: 50,
  },
});

export default Info;
