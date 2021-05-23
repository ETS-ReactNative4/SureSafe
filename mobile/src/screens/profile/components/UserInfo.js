import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from '../../../styles';

export default UserInfo = () => {
  return (
    <View
      style={{
        height: 100,
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        marginBottom: 7,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: Colors.LGREEN,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <FontAwesome5 name={'user'} solid size={25} color={Colors.PRIMARY} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={Fonts.H4}>Jerico Navarro</Text>
          <Text style={Fonts.LIGHT}>Anonang Mayor, Caoayan</Text>
        </View>
      </View>
    </View>
  );
};
