import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from '../../../styles';

export default NotificationCard = props => {
  const {boxColor, iconColor, icon, title, info, time} = props;
  return (
    <TouchableOpacity style={[styles.main, {backgroundColor: boxColor}]}>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.iconBox, {backgroundColor: iconColor}]}>
          <FontAwesome5 name={icon} size={25} color={Colors.FONTS} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={Fonts.H5}>
            {title} <Text style={Fonts.LIGHT}>{info}</Text>
          </Text>
          <Text style={Fonts.LIGHT}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 7,
  },
  iconBox: {
    height: 60,
    width: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
