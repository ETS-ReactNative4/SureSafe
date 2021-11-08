import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import {OnBoardingStack, CreationStack, DashboardStack} from '_screens';
import TabNavigation from './TabNavigation';

const Root = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS === 'ios'
      ? CardStyleInterpolators.forVerticalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
};

export const RootStack = () => {
  return (
    <Root.Navigator headerMode="none">
      <Root.Screen
        name="OnBoardingStack"
        component={OnBoardingStack}
        options={options}
      />
      <Root.Screen
        name="Creation"
        component={CreationStack}
        options={options}
      />
      <Root.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={options}
      />
      <Root.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={options}
      />
    </Root.Navigator>
  );
};
