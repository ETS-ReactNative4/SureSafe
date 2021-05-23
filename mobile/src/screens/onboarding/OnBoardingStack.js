import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import OnBoardingMain from './OnBoardingMain';
import OnBoarding from './OnBoarding';

const Stack = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forVerticalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
};

export default OnBoardingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="OnBoardingMain"
        component={OnBoardingMain}
        options={options}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={options}
      />
    </Stack.Navigator>
  );
};
