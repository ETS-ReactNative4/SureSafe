import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Fonts, Margin, Padding} from '_styles';

import {MainButton, MenuButton, UpdateCard} from './components';
import {Alert} from '_components';
import {UpdatesAPI} from './api';

const Dashboard = props => {
  const {navigation, userData, userID} = props;
  const [data, setData] = useState({});

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  useEffect(() => {
    const getData = async () => {
      await UpdatesAPI(setData, userID);
    };
    getData();
  }, [navigation]);

  const renderUpdates = data => {
    return <UpdateCard data={data.item} />;
  };

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Dashboard
        </Text>
        <Text style={[Fonts.BODY, {color: Colors.PRIMARY, marginBottom: 5}]}>
          {`Hello, ${userData?.firstName}`}
        </Text>
        <Text style={[Fonts.H5, {color: Colors.PRIMARY, marginBottom: 10}]}>
          Track people arround you
        </Text>
        <Alert
          status={alert}
          setStatus={setAlert}
          title={alertTitle}
          info={alertInfo}
          color={alertColor}
        />
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
          <MenuButton
            onPress={() =>
              navigation.navigate('DashboardStack', {
                screen: 'Logs',
              })
            }
            icon="street-view"
            text="Logs"
            color={Colors.LBLUE}
          />
          <MenuButton
            icon="building"
            onPress={() =>
              navigation.navigate('DashboardStack', {
                screen: 'Visits',
              })
            }
            text="Visits"
            color={Colors.LVIOLET}
          />
          <MenuButton
            icon="shield-alt"
            onPress={() =>
              navigation.navigate('TabNavigation', {
                screen: 'Status',
              })
            }
            text="Status"
            color={Colors.LORANGE}
          />
          <MenuButton
            onPress={() => {
              if (data?.role === 'User') {
                setAlertTitle('Access Error');
                setAlertInfo(
                  'This functionality is only available for contact tracers.',
                );
                setAlertColor(Colors.LRED);
                setAlert(true);
              } else {
                navigation.navigate('DashboardStack', {
                  screen: 'AddCase',
                });
              }
            }}
            icon="qrcode"
            text="Case"
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
            height: data?.data?.length > 0 ? 'auto' : '47%',
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
        <FlatList
          data={data?.data}
          renderItem={renderUpdates}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          }}
          // style={styles.scroll}
          horizontal
        />
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userData: state.userData,
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Dashboard);
