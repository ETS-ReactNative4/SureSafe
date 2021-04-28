import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Dashboard from './Dashboard';
import Bluetooth from './Bluetooth';

const Dash = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forNoAnimation,
};

export default DashboardStack = () => {
  return (
    <Dash.Navigator headerMode="none">
      <Dash.Screen name="Bluetooth" component={Bluetooth} options={options} />
    </Dash.Navigator>
  );
};
