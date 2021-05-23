import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding} from '../../../styles';

export default DataShare = () => {
  return (
    <View
      style={{
        height: 170,
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <FontAwesome5
          name={'street-view'}
          solid
          size={35}
          color={Colors.LBLUE}
        />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 13,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share my Geo Tracing</Text>
          <Text style={Fonts.LIGHT}>Last share: April, 20, 2021</Text>
        </View>
        <FontAwesome5
          name={'chevron-right'}
          solid
          size={25}
          color={Colors.FONTS}
        />
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          borderColor: Colors.GREY,
          borderWidth: 1,
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      />

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <FontAwesome5 name={'qrcode'} solid size={35} color={Colors.LORANGE} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share my Visits</Text>
          <Text style={Fonts.LIGHT}>Last share: April, 20, 2021</Text>
        </View>
        <FontAwesome5
          name={'chevron-right'}
          solid
          size={25}
          color={Colors.FONTS}
        />
      </TouchableOpacity>
    </View>
  );
};
