import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {Colors, Fonts, Margin, Padding} from '_styles';

import {MainButton, MenuButton} from './components';
import {Alert, EstablismentCard, Button} from '_components';
import {UpdatesAPI} from './api';
import {getEstabData, shareDataEstab} from 'services';

const ModalShare = ({modalVisible, setModalVisible, userID}) => {
  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  const getData = async () => {
    setBtnStatus(true);
    const datas = await shareDataEstab(userID);
    console.log('datas', datas);
    setBtnStatus(false);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={modalVisible}>
      <Alert
        status={alert}
        setStatus={setAlert}
        title={alertTitle}
        info={alertInfo}
        color={alertColor}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${Colors.FONTS}B3`,
        }}>
        <View
          style={{
            // height: '45%',
            width: '90%',
            margin: 20,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 20,
            alignItems: 'center',
            overflow: 'hidden',
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: Colors.MAIN,
              marginBottom: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingRight: 35,
            }}>
            <Text style={[Fonts.H4, {width: '100%', color: Colors.PRIMARY}]}>
              Share Data
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesome5 name={'times'} size={25} color={Colors.FONTS} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              Fonts.H4,
              {marginBottom: 5, width: '100%', paddingHorizontal: 35},
            ]}>
            {'Share as Exposed'}
          </Text>
          <Text
            style={[
              Fonts.BODY,
              {marginBottom: 20, paddingHorizontal: 32, textAlign: 'left'},
            ]}>
            {
              'Your about to share your logs as exposed this will generate the list of your potential exposed.'
            }
          </Text>
          <Button
            status={btnStatus}
            text="Okay"
            backgroundColor={Colors.LGREEN}
            color={Colors.PRIMARY}
            onPress={getData}
          />
        </View>
      </View>
    </Modal>
  );
};

const Establishment = props => {
  const {navigation, userData, userID} = props;
  const [data, setData] = useState({});
  const [share, setShare] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  const getData = async () => {
    const datas = await getEstabData(userID);
    setData(datas?.data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getData();
  }, [navigation, userID, share]);

  const renderVisitCard = data => {
    return <EstablismentCard data={data.item} />;
  };

  console.log('userID', data?.visitors);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <ModalShare
        userID={userID}
        setModalVisible={setShare}
        modalVisible={share}
      />
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
          onPress={() => setShare(true)}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
  containerScroll: {paddingBottom: 15, paddingTop: 0},
});

const mapStatetoProps = state => {
  return {
    userData: state.userData,
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Establishment);
