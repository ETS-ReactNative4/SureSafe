import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';

import {Fonts, Padding, Colors, Defaults} from '../../../styles';

export default Number = props => {
  const {number, onPress, icons} = props;

  const Render = () => {
    if (icons) {
      return <FontAwesomeIcon icon={faEye} size={30} color="#900" />;
    } else {
      return <Text style={[Fonts.H4]}>{number}</Text>;
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
      }}>
      <Render />
    </TouchableOpacity>
  );
};
