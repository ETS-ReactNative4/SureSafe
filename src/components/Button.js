import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Defaults} from '../styles';

export default Button = props => {
  const {text, onPress, backgroundColor, color} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Defaults.Button[0], {backgroundColor: backgroundColor}]}>
      <Text style={[Defaults.Button[1], {color: color}]}>{text}</Text>
    </TouchableOpacity>
  );
};
