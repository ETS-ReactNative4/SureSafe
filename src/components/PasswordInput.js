import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Defaults, Fonts, Colors} from '../styles';

export default PasswordInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    validator,
    showSoftInputOnFocus,
    state,
    onPress,
    confirmpassword,
    options,
  } = props;

  const [status, setStatus] = React.useState(false);
  const check = status == true ? Colors.LGREEN : Colors.LRED;
  const border = value == '' ? 0 : 2;

  React.useEffect(() => {
    if (confirmpassword == true) {
      setStatus(validator == value ? true : false);
    } else {
      setStatus(validator ? validator(value, options) : false);
    }
  }, [value]);

  return (
    <View>
      <View
        style={[
          Defaults.Input,
          {
            paddingHorizontal: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: check,
            borderWidth: border,
          },
        ]}>
        <TextInput
          onChangeText={onChangeText}
          secureTextEntry={state}
          placeholder={placeholder}
          style={[
            Defaults.Input,
            {flex: 1, marginBottom: 0, height: Defaults.Input[0].height - 4},
          ]}
        />
        <TouchableOpacity
          onPress={onPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: Defaults.Input[0].paddingHorizontal,
          }}>
          <FontAwesome5
            name={'eye'}
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
