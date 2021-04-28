import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

import {Colors, Fonts, Sizes} from '../../../styles';

export default UpdateCard = props => {
  const {color, contact} = props;

  return (
    <View style={styles.mainCard}>
      <View style={styles.topContent}>
        <View style={styles.idText}>
          <Text style={[Fonts.H3, styles.id]}>IS-C123</Text>
          <Text style={[Fonts.H5, styles.whiteText]}>Undetermined</Text>
        </View>
        <View style={styles.contacts}>
          <Text style={[Fonts.H3, {color: color}]}>{contact}</Text>
        </View>
      </View>
      <View style={{flex: 1, paddingVertical: 15}}>
        <Text style={[Fonts.BODY, styles.whiteText]}>
          21 y/o, Male{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>Web Developer</Text> from{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>Brgy Anonang Mayor.</Text>{' '}
          Signs and symtoms are{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>Headache and Fever</Text>,
          travel history <Text style={[Fonts.H5, styles.whiteText]}>None.</Text>
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[Fonts.H6, styles.whiteText]}>Apr 24 2021</Text>
        <View style={styles.covidCase}>
          <Text style={[Fonts.H6, {color: Colors.LYELLOW}]}>
            Covid - 19 Cases
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    height: Sizes.Dashboard.updateCardH,
    width: Sizes.Dashboard.updateCardW,
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.MAIN,
    marginRight: 10,
  },
  topContent: {flexDirection: 'row', height: 50},
  idText: {
    height: '100%',
    flex: 1,
  },
  id: {color: Colors.PRIMARY, marginBottom: 2},
  contacts: {
    height: '100%',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY,
  },
  covidCase: {
    borderWidth: 1,
    borderColor: Colors.LYELLOW,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 'auto',
    borderRadius: 5,
  },
  whiteText: {color: Colors.PRIMARY},
});
