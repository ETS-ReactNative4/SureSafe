import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import Tracing from './Tracing';
import Scan from './Scan';
import Logs from './Logs';
import Visits from './Visits';

const Dash = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forVerticalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
};

const DashboardStack = () => {
  return (
    <Dash.Navigator headerMode="none">
      <Dash.Screen name="Tracing" component={Tracing} options={options} />
      <Dash.Screen name="Scan" component={Scan} options={options} />
      <Dash.Screen name="Logs" component={Logs} options={options} />
      <Dash.Screen name="Visits" component={Visits} options={options} />
    </Dash.Navigator>
  );
};

export default DashboardStack;
