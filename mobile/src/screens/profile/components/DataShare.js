import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
import validator from 'validator';

import {Colors, Fonts, Padding, Icons} from '_styles';
import {Button, Input, Alert} from '_components';
import {shareDataExposed, shareDataInfected} from 'services';

const ModalQrCode = ({modalVisible, setModalVisible, mode, userID}) => {
  // States
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  console.log('userID', userID);

  const onSubmit = async () => {
    if (mode) {
      setBtnStatus(true);
      const datas = await shareDataExposed(userID);
      console.log('datas', datas);
      if (datas.statusCode == 201) {
        setAlertTitle('SUCCESS');
        setAlertInfo(datas?.message);
        setAlert(true);
      } else {
        setAlertTitle('ERROR');
        setAlertInfo(datas?.message);
        setAlertColor(Colors.LRED);
        setAlert(true);
      }
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
      const datas = await shareDataInfected(userID);
      console.log('datas', datas);
      if (datas.statusCode == 201) {
        setAlertTitle('SUCCESS');
        setAlertInfo(datas?.message);
        setAlert(true);
      } else {
        setAlertTitle('ERROR');
        setAlertInfo(datas?.message);
        setAlertColor(Colors.LRED);
        setAlert(true);
      }
      setBtnStatus(false);
    }
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
            {mode ? 'Share as Exposed' : 'Share as Infected'}
          </Text>
          <Text
            style={[
              Fonts.BODY,
              {marginBottom: 20, paddingHorizontal: 32, textAlign: 'left'},
            ]}>
            {!mode
              ? 'Your about to share your logs as infected this will generate the list of your exposure.'
              : 'Your about to share your logs as exposed this will generate the list of your potential exposed.'}
          </Text>
          <Button
            status={btnStatus}
            text="Okay"
            backgroundColor={Colors.LGREEN}
            color={Colors.PRIMARY}
            onPress={() => onSubmit()}
          />
        </View>
      </View>
    </Modal>
  );
};

export const DataShare = ({data, dispatch}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const lastLogs =
    data?.lastLogs === 'None' ? 'N/A' : data?.lastLogs.substr(0, 15);
  return (
    <View
      style={{
        height: 170,
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
      }}>
      <ModalQrCode
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mode={mode}
        userID={data?.userID}
      />
      <TouchableOpacity
        onPress={() => {
          setMode(true);
          setModalVisible(true);
        }}
        style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <FontAwesome5
          name={'street-view'}
          solid
          size={35}
          color={Colors.LYELLOW}
        />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 13,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share as Exposed</Text>
          <Text style={[Fonts.LIGHT, {marginTop: 3}]}>
            Share my logs as exposed
          </Text>
        </View>
        <FontAwesome5
          name={'chevron-right'}
          solid
          size={25}
          color={Colors.FONTS}
        />
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          borderColor: Colors.GREY,
          borderWidth: 1,
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setMode(false);
          setModalVisible(true);
        }}
        style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <FontAwesome5 name={'virus'} solid size={35} color={Colors.LRED} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share as Infected</Text>
          <Text style={[Fonts.LIGHT, {marginTop: 3}]}>
            {' '}
            Share my logs as infected
          </Text>
        </View>
        <FontAwesome5
          name={'chevron-right'}
          solid
          size={25}
          color={Colors.FONTS}
        />
      </TouchableOpacity>
    </View>
  );
};
