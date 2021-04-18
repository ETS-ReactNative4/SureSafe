import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {Defaults, Fonts, Colors} from '../styles';

export default PasswordInput = props => {
  const {onPress, state, placeholder} = props;
  return (
    <View>
      <View
        style={[
          Defaults.Input,
          {
            paddingHorizontal: 0,
            flexDirection: 'row',
          },
        ]}>
        <TextInput
          secureTextEntry={state}
          placeholder={placeholder}
          style={[
            Defaults.Input,
            {flex: 1},
            state == false ? Fonts.H5 : Fonts.H5,
          ]}
        />
        <TouchableOpacity
          onPress={onPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: Defaults.Input[0].paddingHorizontal,
          }}>
          <FontAwesomeIcon
            icon={faEye}
            style={{
              color: state == false ? Colors.LGREEN : Colors.FONTS,
            }}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
