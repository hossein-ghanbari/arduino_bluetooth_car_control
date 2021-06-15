import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Info = () => {
  return (
    <View style={styles.info}>
      <Text style={styles.infoItem}>Temperature : 45c</Text>
      <Text style={styles.infoItem}>Light : on</Text>
      <Text style={styles.infoItem}>Horn : off</Text>
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
