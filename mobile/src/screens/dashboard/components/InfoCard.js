import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Colors, Fonts} from '../../../styles';

const InfoCard = props => {
  const {name, address, title, total} = props;
  return (
    <View style={styles.mainBox}>
      <View>
        <Text style={Fonts.H4}>{name}</Text>
        <Text style={Fonts.LIGHT}>{address}</Text>
      </View>
      <View style={styles.totalBox}>
        <Text style={[Fonts.H6, styles.totalText]}>{title}</Text>
        <Text style={[Fonts.H4, styles.total]}>{total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.SECONDARY,
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalBox: {
    height: 70,
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginLeft: 25,
    overflow: 'hidden',
  },
  totalText: {
    color: Colors.PRIMARY,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: Colors.LGREEN,
    textAlign: 'center',
  },
  total: {
    color: Colors.LGREEN,
    width: '100%',
    flex: 1,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export default InfoCard;
