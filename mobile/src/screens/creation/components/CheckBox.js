import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Defaults, Fonts, Colors} from '../../../styles';

export default CheckBox = props => {
  const {onPress, checked} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity
        style={{
          height: 25,
          width: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: checked ? Colors.LGREEN : Colors.PRIMARY,
          borderWidth: 1,
          borderColor: Colors.GREY,
          borderRadius: 10,
        }}
        onPress={onPress}>
        <FontAwesome5 name={'check'} color={Colors.PRIMARY} size={15} />
      </TouchableOpacity>
      <Text
        style={[
          Fonts.BODY,
          {
            fontSize: Fonts.BODY.fontSize - 2,
            paddingHorizontal: 10,
            flex: 1,
            lineHeight: 20,
          },
        ]}>
        I agree to the Terms & Condition and Privacy Policy
      </Text>
    </View>
  );
};
