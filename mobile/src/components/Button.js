import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Defaults, Colors} from '../styles';

export default Button = props => {
  const {text, onPress, backgroundColor, color, status, styles} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Defaults.Button[0], {backgroundColor: backgroundColor}, styles]}>
      {status ? (
        <ActivityIndicator size="small" color={Colors.PRIMARY} />
      ) : (
        <Text style={[Defaults.Button[1], {color: color}]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
