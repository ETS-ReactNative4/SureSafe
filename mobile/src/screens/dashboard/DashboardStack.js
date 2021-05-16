import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Dashboard from './Dashboard';
import Tracing from './Tracing';

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
      <Dash.Screen name="Tracing" component={Tracing} options={options} />
    </Dash.Navigator>
  );
};
