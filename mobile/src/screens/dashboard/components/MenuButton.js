import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Sizes} from '../../../styles';

export default MenuButton = props => {
  const {onPress, icon, text, color} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <View style={styles.iconBox}>
        <FontAwesome5 name={icon} size={25} color={color} />
      </View>
      <Text style={[Fonts.H5, {color: Colors.PRIMARY}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: Sizes.Dashboard.menuButtonH,
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
