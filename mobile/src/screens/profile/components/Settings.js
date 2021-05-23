import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding} from '../../../styles';

export default Settings = props => {
  const {color, icon, text} = props;

  return (
    <TouchableOpacity
      style={{
        height: 70,
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
        padding: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        marginBottom: 7,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: color,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <FontAwesome5 name={icon} solid size={20} color={Colors.PRIMARY} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={Fonts.H5}>{text}</Text>
        </View>
        <View
          style={{
            padding: 5,
            borderRadius: 6,
            backgroundColor: color,
            marginLeft: 'auto',
          }}>
          <FontAwesome5
            name={'chevron-right'}
            solid
            size={20}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
