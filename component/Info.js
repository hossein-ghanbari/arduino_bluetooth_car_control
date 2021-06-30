import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const Info = () => {
  const [msg, setMsg] = useState({
    status: '',
    heartBeat: 0,
    Temperature: 0,
  });

  useEffect(() => {
    BluetoothSerial.withDelimiter('\r').then(() => {
      BluetoothSerial.on('read', data => {
        console.log(data);
        // setMsg(prevState => {
        //   return {...prevState,};
        // });
      });
    });
  }, []);

  return (
    <View style={styles.info}>
      <Text style={styles.infoItem}>Heart Beat : {msg?.heartBeat}</Text>
      <Text style={styles.infoItem}>Temperature : {msg?.Temperature}c</Text>

      <Text style={styles.infoItem}>
        ---------------------------------------
      </Text>
      <Text style={styles.infoItem}>Status : {msg?.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    paddingBottom: 30,
    marginVertical: 30,
    borderBottomColor: '#6C1D6E',
    borderBottomWidth: 1,
  },
  infoItem: {
    fontSize: 14,
    color: '#555',
    marginVertical: 1,
  },
});

export default Info;
