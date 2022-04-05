import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import Establishment from './Establishment';
import Scan from './Scan';

const Estab = createStackNavigator();

const options = {
  cardStyleInterpolator:
    Platform.OS == 'ios'
      ? CardStyleInterpolators.forVerticalIOS
      : CardStyleInterpolators.forFadeFromBottomAndroid,
};

const EstablishmentStack = () => {
  return (
    <Estab.Navigator headerMode="none">
      <Estab.Screen
        name="Establishment"
        component={Establishment}
        options={options}
      />
      <Estab.Screen name="Scan" component={Scan} options={options} />
    </Estab.Navigator>
  );
};

export default EstablishmentStack;
