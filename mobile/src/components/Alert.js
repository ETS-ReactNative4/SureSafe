import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

import {Colors, Fonts} from '_styles';

export default Alert = props => {
  const {title, info, color, status, setStatus} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={status}
      onRequestClose={() => setStatus()}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <View
          style={{
            width: '90%',
            height: 200,
            backgroundColor: Colors.PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <Text style={[Fonts.H3, {marginTop: 'auto', color: color}]}>
            {title}
          </Text>
          <Text
            style={[
              Fonts.BODY,
              {
                marginTop: 'auto',
                width: '100%',
                paddingHorizontal: 60,
                textAlign: 'center',
              },
            ]}>
            {info}
          </Text>
          <TouchableOpacity
            onPress={() => setStatus(!status)}
            style={{
              width: '100%',
              paddingVertical: 15,
              backgroundColor: color,
              alignItems: 'center',
              marginTop: 'auto',
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
            }}>
            <Text style={[Fonts.H5, {color: Colors.PRIMARY}]}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
