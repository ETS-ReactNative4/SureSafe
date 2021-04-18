import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, PasswordInput, Button} from '../../components';
import {Title, NumberButton} from './components';

export default Number = ({navigation}) => {
  return (
    <View style={Defaults.Creation.backgorund}>
      <Title
        title="SureSafe"
        info="Protect yourself, your family , and your community to prevent COVID-19
        from spreding."
      />
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={1} />
          <NumberButton number={2} />
          <NumberButton number={3} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={4} />
          <NumberButton number={5} />
          <NumberButton number={6} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={7} />
          <NumberButton number={8} />
          <NumberButton number={9} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <NumberButton number={0} />
          <NumberButton number={9} icons={true} />
        </View>
      </View>
    </View>
  );
};
