import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './routes/RootStack';

export default App = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <RootStack />
      </View>
    </NavigationContainer>
  );
};
