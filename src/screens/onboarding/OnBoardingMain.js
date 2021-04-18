import React from 'react';
import {View, Text, Image} from 'react-native';

import {Main} from './Style';
import {Images, Colors} from '../../styles';
import {Button} from '../../components';

export default OnBoardingMain = ({navigation}) => {
  return (
    <View style={Main.container}>
      <Image
        style={Main.Image}
        source={Images.onboardingmain}
        resizeMode="cover"
      />
      <Text style={Main.Title}>Let's help each other to prevent COVID-19</Text>
      <Text style={Main.Info}>
        Protect yourself, your family , and your community to prevent COVID-19
        from spreding.
      </Text>

      <Button
        onPress={() => navigation.navigate('OnBoarding')}
        text="Get started"
        backgroundColor={Colors.LGREEN}
        color={Colors.PRIMARY}
      />
    </View>
  );
};
