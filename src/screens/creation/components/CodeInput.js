import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors, Margin, Sizes} from '../../../styles';

export default CodeInput = props => {
  return (
    <View
      style={{
        height: Sizes.MainInput.height,
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
        marginHorizontal: 5,
      }}>
      <Text style={Fonts.H4}>{props.value ? props.value : ''}</Text>
    </View>
  );
};
