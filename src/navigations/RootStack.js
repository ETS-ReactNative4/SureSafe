import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// import {OnBoardingStack} from '../screens';
import OnBoardingStack from '../screens/onboarding/OnBoardingStack';

const Root = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forNoAnimation,
};

export default RootStack = () => {
  return (
    <Root.Navigator headerMode="none">
      <Root.Screen
        name="OnBoardingStack"
        component={OnBoardingStack}
        options={options}
      />
    </Root.Navigator>
  );
};
