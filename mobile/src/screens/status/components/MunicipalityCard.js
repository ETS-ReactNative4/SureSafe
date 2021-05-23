import React from 'react';
import {View, Text, Platform} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors, Fonts} from '../../../styles';

export default MunicipalityCard = props => {
  const {municipality, recovered, suspected, deaths, total} = props;
  return (
    <View
      style={{
        height: Platform.OS == 'ios' ? 200 : 230,
        width: 150,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 20,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}>
      <Text style={[Fonts.H4]}>{municipality}</Text>

      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome5 name="heartbeat" size={20} color={Colors.LGREEN} />
          <Text
            style={[
              Fonts.H5,
              {color: Colors.LGREEN, marginLeft: 5, marginTop: 2},
            ]}>
            {recovered}
          </Text>
        </View>
      </View>

      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome5
            name="exclamation-triangle"
            size={20}
            color={Colors.LYELLOW}
          />
          <Text
            style={[
              Fonts.H5,
              {color: Colors.LYELLOW, marginLeft: 5, marginTop: 4},
            ]}>
            {suspected}
          </Text>
        </View>
      </View>

      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome5 name="skull-crossbones" size={20} color={Colors.LRED} />
          <Text
            style={[
              Fonts.H5,
              {color: Colors.LRED, marginLeft: 5, marginTop: 4},
            ]}>
            {deaths}
          </Text>
        </View>
      </View>
      <Text style={[Fonts.LIGHT, {marginTop: 'auto'}]}>Total Cases</Text>
      <Text style={[Fonts.H3]}>{total}</Text>
    </View>
  );
};
