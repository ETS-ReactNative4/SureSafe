import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Create from './Create';
import Login from './Login';
import Address from './Address';
import Number from './Number';

const Creation = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forHorizontalIOS
      : CardStyleInterpolators.forNoAnimation,
};

export default CreationStack = () => {
  return (
    <Creation.Navigator headerMode="none">
      <Creation.Screen name="Create" component={Create} options={options} />
      <Creation.Screen name="Login" component={Login} options={options} />
      <Creation.Screen name="Address" component={Address} options={options} />
      <Creation.Screen name="Number" component={Number} options={options} />
    </Creation.Navigator>
  );
};
