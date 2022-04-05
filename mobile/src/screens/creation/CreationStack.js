import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import Create from './Create';
import Login from './Login';
import Information from './Information';
import Number from './Number';
import Code from './Code';
import Establishment from './Establishment';

const Creation = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS === 'ios'
      ? CardStyleInterpolators.forVerticalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
};

const CreationStack = () => {
  return (
    <Creation.Navigator headerMode="none">
      <Creation.Screen name="Login" component={Login} options={options} />
      <Creation.Screen
        name="Establishment"
        component={Establishment}
        options={options}
      />
      <Creation.Screen
        name="Information"
        component={Information}
        options={options}
      />
      <Creation.Screen name="Number" component={Number} options={options} />
      <Creation.Screen name="Code" component={Code} options={options} />
    </Creation.Navigator>
  );
};

export default CreationStack;
