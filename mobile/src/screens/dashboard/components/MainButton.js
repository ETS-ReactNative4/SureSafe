import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Sizes} from '../../../styles';

export default MainButton = props => {
  const {icon, title, info, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <View style={styles.iconBox}>
        <FontAwesome5 name={icon} size={35} color={Colors.PRIMARY} />
      </View>
      <View style={styles.text}>
        <Text style={[Fonts.H5]}>{title}</Text>
        <Text style={[Fonts.LIGHT]}>{info}</Text>
      </View>
      <View style={styles.icon}>
        <FontAwesome5 name={'chevron-right'} size={25} color={Colors.FONTS} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: Sizes.Dashboard.mainButtonH,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    marginBottom: Margin.TEXT,
  },
  iconBox: {
    height: '100%',
    width: '25%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LGREEN,
  },
  text: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  icon: {
    paddingRight: 20,
    justifyContent: 'center',
    marginLeft: 10,
  },
});
