import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Main} from './Style';
import {Images, Fonts, Padding, Colors, Defaults} from '../../styles';

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
      <TouchableOpacity
        style={Defaults.Button[0]}
        onPress={() => navigation.navigate('OnBoarding')}>
        <Text style={Defaults.Button[1]}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};
