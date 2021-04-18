import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, Button} from '../../components';
import {Title} from './components';

export default Address = ({navigation}) => {
  return (
    <View style={Defaults.Creation.backgorund}>
      <Title
        title="More Info."
        info="Please enter your address for us to easilly find you in case of 
        emergency. We don't share your information with others."
      />
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>Address</Text>
        <Input placeholder="Province" />
        <Input placeholder="Municipality" />
        <Input placeholder="Barangay" />
        <Button
          text="Next"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => navigation.navigate('Number')}
        />
      </View>
    </View>
  );
};
