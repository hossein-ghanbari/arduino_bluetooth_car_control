import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

const BluetoothOption = () => {
  const [bluetoothEnable, setBluetoothEnable] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [device, setDevice] = useState([]);
  const [connected, setConnected] = useState(false);

  const [modal, setModal] = useState(false);

  const requestEnable = () => {
    BluetoothSerial.requestEnable()
      .then(res => setBluetoothEnable(true))
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      });
  };

  const discover = () => {
    if (discovering) {
      return false;
    } else {
      setDiscovering(true);
      BluetoothSerial.list()
        .then(res => {
          setDeviceList(res);
          setDiscovering(false);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
        });
    }
  };

  const connect = deviceData => {
    BluetoothSerial.connect(deviceData.id)
      .then(res => {
        ToastAndroid.show(
          `Connected to device ${deviceData.name}`,
          ToastAndroid.LONG,
        );

        setDevice(deviceData);
        setConnected(true);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG));
  };

  const onDevicePress = deviceData => {
    connect(deviceData);
  };

  useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        setBluetoothEnable(isEnabled);
        setDeviceList(devices);
      },
    );

    BluetoothSerial.on('bluetoothEnabled', () => setBluetoothEnable(true));
    BluetoothSerial.on('bluetoothDisabled', () => setBluetoothEnable(false));
    BluetoothSerial.on('error', err => {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    });
    BluetoothSerial.on('connectionLost', () => {
      if (device) {
        ToastAndroid.show(
          `Connection to device ${device?.name} has been lost`,
          ToastAndroid.LONG,
        );
      }
      this.setState({connected: false});
    });
  }, [device]);

  useEffect(() => {
    !bluetoothEnable && requestEnable();
  }, [bluetoothEnable]);

  return (
    <>
      <View style={styles.bluetoothOption}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setModal(true);
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>device list</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalHeadBtns}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={discover}
              style={styles.btn}>
              <Text style={styles.btnText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModal(false)}
              style={[styles.btn, styles.btn2]}>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
          </View>
          {discovering && <ActivityIndicator size="large" color="#6C1D6E" />}
          {deviceList?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                onPress={() => onDevicePress(item)}
                style={styles.deviceItem}>
                <Text key={index}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bluetoothOption: {
    paddingVertical: 30,
    borderBottomColor: '#6C1D6E',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  btn: {
    height: 45,
    borderRadius: 6,
    backgroundColor: '#6C1D6E',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  btn2: {
    marginLeft: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  modalHeadBtns: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  deviceItem: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default BluetoothOption;
