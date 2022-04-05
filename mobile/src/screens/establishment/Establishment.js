import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Fonts, Margin, Padding} from '_styles';

import {MainButton, MenuButton} from './components';
import {Alert, EstablismentCard} from '_components';
import {UpdatesAPI} from './api';
import {getEstabData} from 'services';

const Establishment = props => {
  const {navigation, userData, userID} = props;
  const [data, setData] = useState({});

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  useEffect(() => {
    const getData = async () => {
      const datas = await getEstabData(userID);
      setData(datas?.data);
    };
    getData();
  }, [navigation]);

  const renderVisitCard = data => {
    return <EstablismentCard data={data.item} />;
  };

  console.log('userID', data?.visitors);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 0.6}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Establishment
        </Text>
        <Text style={[Fonts.BODY, {color: Colors.PRIMARY, marginBottom: 5}]}>
          {`Hello, ${data?.estabName}`}
        </Text>
        <Text style={[Fonts.H5, {color: Colors.PRIMARY, marginBottom: 10}]}>
          Track people in your area
        </Text>
        <Alert
          status={alert}
          setStatus={setAlert}
          title={alertTitle}
          info={alertInfo}
          color={alertColor}
        />
        {/* <MainButton
          icon="street-view"
          title="Geo Tracing"
          info="Anonymously log other nearby app users"
          onPress={() => navigation.navigate('DashboardStack')}
        /> */}
        <MainButton
          icon="qrcode"
          title="Scan QR"
          info="Scan QR qr codes of users who enter in your establishment."
          onPress={() =>
            navigation.navigate('EstablishmentStack', {
              screen: 'Scan',
            })
          }
        />
        <MainButton
          icon="virus"
          title="Share as Exposed"
          info="Share your establishment data as exposed."
          onPress={() =>
            navigation.navigate('EstablishmentStack', {
              screen: 'Scan',
            })
          }
        />
      </View>
      <View
        style={[
          {
            backgroundColor: Colors.PRIMARY,
            paddingTop: 20,
            flex: 1,
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
          Visitors
        </Text>
        <FlatList
          data={data?.visitors}
          renderItem={renderVisitCard}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.containerScroll}
          style={styles.scroll}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visits: {flex: 1, backgroundColor: Colors.MAIN},
  list: {flex: 1, backgroundColor: Colors.PRIMARY},
  scroll: {
    flex: 1,
    paddingHorizontal: 10,
    height: '100%',
  },
  containerScroll: {paddingVertical: 15},
});

const mapStatetoProps = state => {
  return {
    userData: state.userData,
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Establishment);
