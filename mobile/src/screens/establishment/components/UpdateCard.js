import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors, Fonts, Sizes} from '_styles';

const UpdateCard = ({data}) => {
  console.log(data);
  const userIdentification = data.userID.substring(
    data.userID.length - 4,
    data.userID.length,
  );
  const date = new Date(data.date);
  const updateDate = date.toString().substr(0, 15);
  return (
    <View style={styles.mainCard}>
      <View style={styles.topContent}>
        <View style={styles.idText}>
          <Text
            style={[Fonts.H3, styles.id]}>{`SS-${userIdentification}`}</Text>
          <Text style={[Fonts.H5, styles.whiteText]}>{data.exposure}</Text>
        </View>
        <View style={styles.contacts}>
          <Text style={[Fonts.H3, {color: Colors.MAIN}]}>{data.status}</Text>
        </View>
      </View>
      <View style={{flex: 1, paddingVertical: 15}}>
        <Text style={[Fonts.BODY, styles.whiteText]}>
          <Text
            style={[
              Fonts.H5,
              styles.whiteText,
            ]}>{`SS-${userIdentification}`}</Text>{' '}
          from <Text style={[Fonts.H5, styles.whiteText]}>{data.barangay}</Text>
          ,{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>{data.municipality}</Text>{' '}
          has been{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>{data.status}</Text>, with{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>{data.totalExposed}</Text>{' '}
          exposed,{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>
            {data.totalPotential}
          </Text>{' '}
          potential and{' '}
          <Text style={[Fonts.H5, styles.whiteText]}>{data.totalVisits}</Text>{' '}
          visits.
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[Fonts.H6, styles.whiteText]}>{updateDate}</Text>
        <View style={styles.covidCase}>
          <Text style={[Fonts.H6, {color: Colors.LYELLOW}]}>
            Covid - 19 Cases
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpdateCard;

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
