import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors, Margin} from '_styles';

export default Title = props => {
  const align = props.center == true ? 'center' : 'left';
  return (
    <>
      <Text style={[props.font, {color: Colors.PRIMARY, textAlign: align}]}>
        {props.title}
      </Text>
      <Text
        style={[
          Fonts.BODY,
          {
            color: Colors.PRIMARY,
            lineHeight: 20,
            textAlign: align,
            marginBottom: Margin.INPUT,
          },
        ]}>
        {props.info}
      </Text>
    </>
  );
};
