import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Fonts, Padding, Colors, Defaults} from '../../../styles';

export default Number = props => {
  const {number, onPress, icons, margin} = props;
  const mid = margin == true ? 20 : 0;

  const Render = () => {
    if (icons) {
      return <FontAwesome5 name={'backspace'} color={Colors.FONTS} size={20} />;
    } else {
      return <Text style={[Fonts.H3]}>{number}</Text>;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 80,
        borderRadius: 10,
        margin: 2,
        marginHorizontal: mid,
      }}>
      <Render />
    </TouchableOpacity>
  );
};
