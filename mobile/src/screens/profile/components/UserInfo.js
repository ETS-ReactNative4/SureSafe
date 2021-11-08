import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {Colors, Fonts} from '_styles';

const UserInfo = props => {
  const {userData} = props;
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
        marginTop: 10,
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
          <Text
            style={
              Fonts.H4
            }>{`${userData?.firstName} ${userData?.lastName}`}</Text>
          <Text
            style={
              Fonts.LIGHT
            }>{`${userData?.barangay}, ${userData?.municipality}`}</Text>
        </View>
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStatetoProps)(UserInfo);
