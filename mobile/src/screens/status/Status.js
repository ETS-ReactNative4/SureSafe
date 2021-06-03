import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Margin, Padding} from '../../styles';
import {Button} from '../../components';
import {MunicipalityCard} from './components';

export default Status = ({navigation}) => {
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Status
        </Text>
        <View style={styles.casesBox}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.totalCases}>
              <FontAwesome5
                name={'users'}
                solid
                size={30}
                color={Colors.SECONDARY}
              />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 12}}>
              <Text style={Fonts.H3}>50,076</Text>
              <Text style={Fonts.LIGHT}>
                Total cases in Ilocos sur as of today.
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.recovered}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Recovered</Text>
              <Text style={[Fonts.H4, {color: Colors.LGREEN}]}>3,057</Text>
            </View>

            <View style={styles.suspected}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Suspected</Text>
              <Text style={[Fonts.H4, {color: Colors.LYELLOW}]}>3,057</Text>
            </View>

            <View style={styles.deaths}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Deaths</Text>
              <Text style={[Fonts.H4, {color: Colors.LRED}]}>3,057</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.8, marginRight: 10}}>
            <View
              style={[
                styles.usersBox,
                {height: 168, justifyContent: 'flex-start'},
              ]}>
              <Text style={[Fonts.H4, {color: Colors.LGREEN, marginBottom: 5}]}>
                CovidFree
              </Text>
              <Text style={[Fonts.LIGHT, {color: Colors.GREY}]}>
                You are not exposed to someone with the virus!
              </Text>
              <Button
                text="Check"
                status={false}
                backgroundColor={Colors.LBLUE}
                color={Colors.PRIMARY}
                styles={{
                  width: '100%',
                  height: 50,
                  borderRadius: 15,
                  marginTop: 'auto',
                }}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={styles.usersBox}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.usersIcon}>
                  <FontAwesome5
                    name={'street-view'}
                    solid
                    size={25}
                    color={Colors.SECONDARY}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 8}}>
                  <Text style={Fonts.H4}>120,304</Text>
                  <Text
                    style={[Fonts.LIGHT, {fontSize: Fonts.LIGHT.fontSize - 2}]}>
                    Geo Tracing active
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.usersBox}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.usersIcon}>
                  <FontAwesome5
                    name={'qrcode'}
                    solid
                    size={25}
                    color={Colors.SECONDARY}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 8}}>
                  <Text style={Fonts.H4}>120,304</Text>
                  <Text
                    style={[Fonts.LIGHT, {fontSize: Fonts.LIGHT.fontSize - 2}]}>
                    QR Codes Scans
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
          Municipality
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          }}>
          <MunicipalityCard
            municipality="Caoayan"
            recovered={450}
            suspected={650}
            deaths={14}
            total={1014}
          />
          <MunicipalityCard
            municipality="Bantay"
            recovered={450}
            suspected={650}
            deaths={14}
            total={1014}
          />
          <MunicipalityCard
            municipality="Vigan"
            recovered={450}
            suspected={650}
            deaths={14}
            total={1014}
          />
          <MunicipalityCard
            municipality="San Vicente"
            recovered={450}
            suspected={650}
            deaths={14}
            total={1014}
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
