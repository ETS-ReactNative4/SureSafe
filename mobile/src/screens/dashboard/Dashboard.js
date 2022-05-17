import React, {useState, useEffect} from 'react';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors, Fonts, Icons, Padding} from '_styles';
import QRCode from 'react-native-qrcode-svg';
import {MainButton, MenuButton, UpdateCard} from './components';
import {Alert} from '_components';
import {UpdatesAPI} from './api';

const ModalQrCode = ({modalVisible, setModalVisible, qrcode}) => {
  // States
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

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
              My QRCode
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
            {'Scan ME'}
          </Text>
          <Text style={[Fonts.BODY, {marginBottom: 20, paddingHorizontal: 35}]}>
            {
              'Please share this QR Code to establishments using SureSafe. Thank you!'
            }
          </Text>
          <QRCode
            value={qrcode}
            size={280}
            logo={Icons.sureSafeLogo}
            logoSize={70}
            logoBackgroundColor="transparent"
            color={Colors.FONTS}
          />
        </View>
      </View>
    </Modal>
  );
};

const Dashboard = props => {
  const {navigation, userData, userID} = props;
  const [data, setData] = useState({});
  const [myQrcode, setMyQrcode] = useState(false);

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
      <ModalQrCode
        qrcode={userID}
        setModalVisible={setMyQrcode}
        modalVisible={myQrcode}
      />
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
              setMyQrcode(true);
            }}
            icon="qrcode"
            text="Qrcode"
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
        {data?.data?.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[Fonts.H4, {color: Colors.MAIN, marginBottom: 40}]}>
              No Updates yet.
            </Text>
          </View>
        ) : (
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
        )}
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
