import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Sizes} from '_styles';

export default VisitsCard = props => {
  const {estabName, visitDate} = props?.item;
  const date = new Date(visitDate);
  const dateString = date.toString().substring(0, 15);

  function formatAMPM(date, bool) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return bool ? hours + ':' + minutes : ampm;
  }

  return (
    <View style={styles.main}>
      <View style={styles.devider} />
      <View style={styles.textBox}>
        <Text style={[Fonts.H4, {marginBottom: 5}]}>{estabName}</Text>
        <Text style={[Fonts.BODY]}>{dateString}</Text>
      </View>
      <View style={styles.timeBox}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={[Fonts.H2, {color: Colors.PRIMARY}]}>
            {formatAMPM(date, true)}
          </Text>
          <Text style={[Fonts.H4, {color: Colors.PRIMARY, marginBottom: 5}]}>
            {' '}
            {formatAMPM(date, false)}
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
    flex: 0.6,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MAIN,
  },
});
