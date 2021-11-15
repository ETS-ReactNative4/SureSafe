import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Sizes} from '_styles';

export default ScanCard = ({item, notif}) => {
  let userIdentification = item.userID.substring(
    item.userID.length - 4,
    item.userID.length,
  );
  const logDate = new Date(item.logDate);
  // const time = new Date(item.time);
  // const diffMs = logDate - time;
  // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  const logDateString = logDate.toString().substring(0, 15);
  return (
    <View style={styles.main}>
      <View style={styles.devider} />
      <View style={styles.textBox}>
        <Text style={[Fonts.H4]}>{`SS-${userIdentification}`}</Text>
        <Text style={[Fonts.BODY]}>{logDateString}</Text>
        <View style={styles.statusBox}>
          <View style={styles.status}>
            <Text
              style={[
                Fonts.H6,
                {
                  color: Colors.MAIN,
                },
              ]}>
              {item.status ? item.status : 'Covid Free'}
            </Text>
          </View>
          {notif ? (
            <></>
          ) : (
            <View style={styles.status}>
              <Text
                style={[
                  Fonts.H6,
                  {
                    color: Colors.MAIN,
                  },
                ]}>
                {item.exposure}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.timeBox}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={[Fonts.H2, {color: Colors.PRIMARY}]}>
            {parseInt(item.time)}
          </Text>
          <Text style={[Fonts.H4, {color: Colors.PRIMARY, marginBottom: 5}]}>
            {' '}
            min
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
  textBox: {flex: 1, paddingHorizontal: 15, paddingVertical: 15},
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
