import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from '../styles';

export default Header = props => {
  const {navigation, title} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <FontAwesome5 name={'angle-left'} size={30} color={Colors.LGREEN} />
      </TouchableOpacity>
      <Text style={[Fonts.H3, styles.header]}>{title}</Text>
      <TouchableOpacity style={styles.info}>
        <FontAwesome5 name={'info'} size={20} color={Colors.LGREEN} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: Colors.PRIMARY,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  info: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
