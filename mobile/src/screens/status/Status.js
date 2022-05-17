import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {Colors, Fonts, Margin, Padding} from '_styles';
import {Button} from '_components';
import {StatusAPI} from './api';

const Status = props => {
  const {navigation, userData} = props;
  const [data, setData] = useState({
    data: {
      userState: {
        status: 'N/A',
        exposure: 'N/A',
      },
      infected: 0,
      exposed: 0,
      recovered: 0,
      potential: 0,
      geotracing: 0,
      users: 0,
      total: 0,
      logs: 0,
      visits: 0,
      sharedLogs: 0,
      sharedVisits: 0,
    },
  });

  const {
    userState,
    infected,
    exposed,
    recovered,
    potential,
    geotracing,
    users,
    total,
    logs,
    visits,
    sharedLogs,
    sharedVisits,
  } = data?.data;

  useEffect(() => {
    const getData = async () => {
      await StatusAPI(userData, setData);
    };
    getData();
  }, [navigation, userData]);

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
                name={'hospital-user'}
                solid
                size={25}
                color={Colors.SECONDARY}
              />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 12}}>
              <Text style={Fonts.H3}>{total}</Text>
              <Text style={Fonts.LIGHT}>Total cases in suresafe</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.recovered}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Potential</Text>
              <Text style={[Fonts.H4, {color: Colors.LGREEN}]}>
                {potential}
              </Text>
            </View>

            <View style={styles.suspected}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Exposed</Text>
              <Text style={[Fonts.H4, {color: Colors.LYELLOW}]}>{exposed}</Text>
            </View>

            <View style={styles.deaths}>
              <Text style={[Fonts.LIGHT, {width: '100%'}]}>Infected</Text>
              <Text style={[Fonts.H4, {color: Colors.LRED}]}>{infected}</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* <View style={{flex: 0.8, marginRight: 10}}>
            <View
              style={[
                styles.usersBox,
                {height: 168, justifyContent: 'flex-start'},
              ]}>
              <View style={[styles.usersIcon, {marginBottom: 10}]}>
                <FontAwesome5
                  name={'medkit'}
                  solid
                  size={25}
                  color={Colors.SECONDARY}
                />
              </View>
              <Text style={[Fonts.H4, {marginBottom: 5}]}>{recovered}</Text>
              <Text style={[Fonts.LIGHT]}>
                Total recovered using the SureSafe application.
              </Text>
            </View>
          </View> */}

          <View style={{flex: 1}}>
            <View style={styles.usersBox}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.usersIcon]}>
                  <FontAwesome5
                    name={'street-view'}
                    solid
                    size={25}
                    color={Colors.SECONDARY}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 8}}>
                  <Text style={Fonts.H4}>{geotracing}</Text>
                  <Text
                    style={[Fonts.LIGHT, {fontSize: Fonts.LIGHT.fontSize - 2}]}>
                    Total geotracing on
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.usersBox}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.usersIcon}>
                  <FontAwesome5
                    name={'users'}
                    solid
                    size={25}
                    color={Colors.SECONDARY}
                  />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 8}}>
                  <Text style={Fonts.H4}>{users}</Text>
                  <Text
                    style={[Fonts.LIGHT, {fontSize: Fonts.LIGHT.fontSize - 2}]}>
                    Total suresafe users
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
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          },
        ]}>
        <View style={styles.statusBox}>
          <View style={styles.myStatus}>
            <View style={{marginRight: 'auto'}}>
              <Text style={[Fonts.H4, {color: Colors.PRIMARY}]}>
                {userState?.status}
              </Text>
              <Text style={[Fonts.LIGHT, {color: Colors.PRIMARY}]}>
                {userState?.exposure}
              </Text>
            </View>
            <FontAwesome5
              name={'heartbeat'}
              solid
              size={40}
              color={Colors.SECONDARY}
            />
          </View>
          <View
            style={{
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.statusNumbers}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', marginLeft: 8}}>
                    <Text style={Fonts.H4}>{logs}</Text>
                    <Text
                      style={[
                        Fonts.LIGHT,
                        {fontSize: Fonts.LIGHT.fontSize - 2},
                      ]}>
                      Your logs now
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.statusNumbers}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', marginLeft: 8}}>
                    <Text style={Fonts.H4}>{visits}</Text>
                    <Text
                      style={[
                        Fonts.LIGHT,
                        {fontSize: Fonts.LIGHT.fontSize - 2},
                      ]}>
                      Your visits now
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.statusNumbers}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', marginLeft: 8}}>
                    <Text style={Fonts.H4}>{sharedLogs}</Text>
                    <Text
                      style={[
                        Fonts.LIGHT,
                        {fontSize: Fonts.LIGHT.fontSize - 2},
                      ]}>
                      Logs you shared
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View style={styles.statusNumbers}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', marginLeft: 8}}>
                    <Text style={Fonts.H4}>{sharedVisits}</Text>
                    <Text
                      style={[
                        Fonts.LIGHT,
                        {fontSize: Fonts.LIGHT.fontSize - 2},
                      ]}>
                      Visits you shared
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusNumbers: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statusBox: {
    width: '100%',
    backgroundColor: Colors.SECONDARY,
    borderRadius: 20,
    overflow: 'hidden',
  },
  myStatus: {
    width: '100%',
    backgroundColor: Colors.MAIN,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
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

const mapStatetoProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStatetoProps)(Status);
