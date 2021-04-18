import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors} from '../../../styles';

export default Title = props => {
  return (
    <View
      style={[
        Padding.CREATION,
        {flex: 1, justifyContent: 'center', paddingBottom: 0},
      ]}>
      <Text style={[Fonts.TITLE, {color: Colors.PRIMARY}]}>{props.title}</Text>
      <Text style={[Fonts.BODY, {color: Colors.PRIMARY, lineHeight: 20}]}>
        {props.info}
      </Text>
    </View>
  );
};
