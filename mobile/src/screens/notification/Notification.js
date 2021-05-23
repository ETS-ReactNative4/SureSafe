import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Padding} from '../../styles';
import {Button} from '../../components';
import {NotificationCard} from './components';

export default Notification = ({navigation}) => {
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Notification
        </Text>
      </View>

      <View
        style={[
          {
            backgroundColor: Colors.PRIMARY,
            height: Platform.OS == 'ios' ? '85%' : '90%',
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          },
        ]}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Padding.CONTAINER.paddingBottom,
            paddingTop: 20,
          }}>
          <NotificationCard
            boxColor={Colors.SECONDARY}
            iconColor={Colors.LBLUE}
            icon="clipboard-check"
            title="Vaccine Request"
            info="is accepted."
            time="9 minutes ago"
          />

          <NotificationCard
            boxColor={Colors.PRIMARY}
            iconColor={Colors.LYELLOW}
            icon="exclamation-triangle"
            title="Exposed"
            info="to someone infected."
            time="20 minutes ago"
          />

          <NotificationCard
            boxColor={Colors.SECONDARY}
            iconColor={Colors.LBLUE}
            icon="clipboard-check"
            title="Vaccine Request"
            info="is accepted."
            time="9 minutes ago"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  casesBox: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 10,
  },
  totalCases: {
    backgroundColor: Colors.MAIN,
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recovered: {
    height: 55,
    flex: 1,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.LGREEN,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suspected: {
    height: 55,
    flex: 1,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.LYELLOW,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deaths: {
    height: 55,
    flex: 1,
    borderRadius: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.LRED,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usersBox: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 5,
    justifyContent: 'center',
  },
  usersIcon: {
    backgroundColor: Colors.MAIN,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
