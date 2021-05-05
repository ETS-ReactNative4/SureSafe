import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './redux/store';

import RootStack from './routes/RootStack';

export default App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={{flex: 1}}>
          <RootStack />
        </View>
      </NavigationContainer>
    </Provider>
  );
};
