import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Sizes} from '../styles';

export default VisitsCard = ({item}) => {
  return (
    <View style={styles.main}>
      <View style={styles.devider}></View>
      <View style={styles.textBox}>
        <Text style={[Fonts.H4, {marginBottom: 5}]}>{'Puregold Vigan'}</Text>
        <Text style={[Fonts.BODY]}>{'Fri 9 Apr 2021'}</Text>
      </View>
      <View style={styles.timeBox}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={[Fonts.H2, {color: Colors.PRIMARY}]}>{'3:50'}</Text>
          <Text style={[Fonts.H4, {color: Colors.PRIMARY, marginBottom: 5}]}>
            {' '}
            pm
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: Sizes.Components.scanCardH,
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: Colors.SECONDARY,
    marginBottom: Margin.TEXT,
  },
  devider: {
    height: '100%',
    width: 20,
    backgroundColor: Colors.MAIN,
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  statusBox: {flexDirection: 'row', marginTop: 5},
  status: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginRight: 5,
  },
  timeBox: {
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MAIN,
  },
});
