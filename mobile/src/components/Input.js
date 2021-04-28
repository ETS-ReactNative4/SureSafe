import React from 'react';
import {View, TextInput} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Defaults, Fonts, Colors} from '../styles';

export default Input = props => {
  const {
    placeholder,
    value,
    onChangeText,
    validator,
    showSoftInputOnFocus,
  } = props;

  const [state, setState] = React.useState(false);
  const check = state == true ? Colors.LGREEN : Colors.LRED;
  const icon = state == true ? 'check-circle' : 'times-circle';
  const border = value == '' ? 0 : 2;

  const RenderIcon = () => {
    if (value != '') {
      return (
        <FontAwesome5
          name={icon}
          solid
          style={{
            paddingRight: Defaults.Input[0].paddingHorizontal,
            color: check,
          }}
          size={25}
        />
      );
    } else {
      return <></>;
    }
  };

  React.useEffect(() => {
    const noSpace = value ? value.replace(/\s+/g, '') : '';
    setState(validator ? validator(noSpace) : false);
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
          placeholder={placeholder}
          value={value}
          showSoftInputOnFocus={showSoftInputOnFocus ? false : true}
          onChangeText={onChangeText}
          style={[
            Defaults.Input,
            {flex: 1, marginBottom: 0, height: Defaults.Input[0].height - 4},
          ]}
        />
        <RenderIcon />
      </View>
    </View>
  );
};
