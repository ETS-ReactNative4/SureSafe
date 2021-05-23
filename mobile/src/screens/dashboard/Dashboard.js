import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Padding} from '../../styles';

import {MainButton, MenuButton, UpdateCard} from './components';

export default Dashboard = ({navigation}) => {
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Dashboard
        </Text>
        <Text style={[Fonts.BODY, {color: Colors.PRIMARY, marginBottom: 5}]}>
          Hello, Jerico
        </Text>
        <Text style={[Fonts.H5, {color: Colors.PRIMARY, marginBottom: 10}]}>
          Track people arround you
        </Text>
        <MainButton
          icon="street-view"
          title="Geo Tracing"
          info="Anonymously log other nearby app users"
          onPress={() => navigation.navigate('DashboardStack')}
        />
        <MainButton
          icon="qrcode"
          title="Record Visits"
          info="Scan QR codes to where you go to log your visit."
          onPress={() =>
            navigation.navigate('DashboardStack', {
              screen: 'Scan',
            })
          }
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <MenuButton icon="street-view" text="Logs" color={Colors.LBLUE} />
          <MenuButton icon="qrcode" text="Visits" color={Colors.LVIOLET} />
          <MenuButton
            icon="clipboard-list"
            text="Check"
            color={Colors.LORANGE}
          />
          <MenuButton
            icon="people-arrows"
            text="Cases"
            color={Colors.LYELLOW}
          />
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: Colors.PRIMARY,
            paddingTop: 20,
            paddingBottom: 100,
          },
        ]}>
        <Text
          style={[
            Fonts.H3,
            {
              marginBottom: 15,
              paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
            },
          ]}>
          Updates
        </Text>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          }}
          horizontal>
          <UpdateCard contact="Limited" color={Colors.LYELLOW} />
          <UpdateCard contact="Broad" color={Colors.LRED} />
          <UpdateCard contact="Extensive" color={Colors.LORANGE} />
        </ScrollView>
      </View>
    </View>
  );
};
