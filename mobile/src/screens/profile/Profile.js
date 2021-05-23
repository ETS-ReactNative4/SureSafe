import React from 'react';
import {Text, View, Platform} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding} from '../../styles';
import {UserInfo, DataShare, Settings} from './components';

export default Profile = () => {
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Profile
        </Text>
        <UserInfo />
        <DataShare />
      </View>

      <View
        style={[
          {
            paddingTop: 20,
            paddingBottom: 100,
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
            height: Platform.OS == 'ios' ? 'auto' : '55%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Settings color={Colors.MAIN} icon="user-cog" text="User Settings" />
        <Settings color={Colors.LYELLOW} icon="file-alt" text="Terms of Use" />
        <Settings color={Colors.LBLUE} icon="cog" text="Preferences" />
        <Settings color={Colors.LRED} icon="sign-out-alt" text="Sign Out" />
      </View>
    </View>
  );
};
