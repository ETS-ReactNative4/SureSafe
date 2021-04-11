import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import OnBoardingMain from './OnBoardingMain';

const Stack = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forNoAnimation,
};

export default OnBoardingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="OnBoardingMain"
        component={OnBoardingMain}
        options={options}
      />
    </Stack.Navigator>
  );
};
