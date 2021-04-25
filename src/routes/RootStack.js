import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {OnBoardingStack, CreationStack, DashboardStack} from '../screens';
import TabNavigation from './TabNavigation';

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
