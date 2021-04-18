import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import RootStack from './routes/RootStack';

export default App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <RootStack />
      </View>
    </NavigationContainer>
  );
};
