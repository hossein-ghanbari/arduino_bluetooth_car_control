import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const Info = () => {
  const [msg, setMsg] = useState([0, 0, 0]);

  // recived_data = [temp, heartBeat, lightSensor];

  useEffect(() => {
    let localMsg = [];
    BluetoothSerial.withDelimiter('\r').then(() => {
      BluetoothSerial.on('read', data => {
        localMsg = data?.data?.split(',');

        if (localMsg?.length > 0) {
          setMsg(localMsg);
        }
      });
    });
  }, []);

  return (
    <View style={styles.info}>
      <Text style={styles.infoItem}>♥ : {msg[1] > 10 ? msg[1] : 0}</Text>
      <Text style={styles.infoItem}>🌡 : {Number(msg[0])?.toFixed()}c</Text>
      <Text style={styles.infoItem}>🕒 : {msg[2] > 12 ? 'Day' : 'Night'}</Text>
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
    fontSize: 14,
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
