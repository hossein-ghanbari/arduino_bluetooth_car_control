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
  const [isEnabled, setIsEnabled] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);

  const [modal, setModal] = useState(false);

  const connect = deviceData => {
    setIsConnecting(true);

    BluetoothSerial.connect(deviceData.id)
      .then(res => {
        ToastAndroid.show(
          `Connected to device ${deviceData.name}`,
          ToastAndroid.SHORT,
        );
        setConnected(true);
        setDevice(deviceData);
        setIsConnecting(false);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setIsConnecting(false);
      });
  };

  const onDevicePress = deviceData => {
    connect(deviceData);
  };

  useEffect(() => {
    const getList = () => {
      BluetoothSerial.list().then(values => {
        setDevices(values);
      });
    };

    const checkIsEnabled = () => {
      BluetoothSerial.isEnabled().then(values => {
        if (values) {
          getList();
        }
      });
    };

    checkIsEnabled();

    BluetoothSerial.on('bluetoothEnabled', getList);
    BluetoothSerial.on('bluetoothDisabled', () => {
      setIsEnabled(false);
      setConnected(false);
      setDevices([]);
    });
    BluetoothSerial.on('error', err => {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    });
  }, []);

  useEffect(() => {
    const requestEnable = () => {
      BluetoothSerial.requestEnable()
        .then(res => setIsEnabled(true))
        .catch(err => {
          requestEnable();
          ToastAndroid.show(err?.message, ToastAndroid.SHORT);
        });
    };

    !isEnabled && requestEnable();
  }, [isEnabled]);

  useEffect(() => {
    return () => {
      connected && BluetoothSerial.disconnect();
    };
  }, [connected]);

  return (
    <>
      <View style={styles.bluetoothOption}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setModal(true);
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>
            {`device list ${connected && device?.name ? device?.name : ''}`}
          </Text>
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
              onPress={() => setModal(false)}
              style={styles.btn}>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
          </View>
          {isConnecting && <ActivityIndicator size="large" color="#6C1D6E" />}
          {devices?.map((item, index) => {
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
    paddingVertical: 10,
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
