import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';

import {Colors, Fonts, Padding, Icons} from '_styles';
import {Header, Alert, Button, PickerCustom} from '_components';
import {ScanApi} from './api';

const ModalCase = ({modalVisible, setModalVisible, mode}) => {
  const [status, setStatus] = useState('Status');
  const statuses = ['Infected', 'Potential', 'Recovered', 'Exposed'];
  let userIdentification = mode?.substring(mode?.length - 4, mode?.length);
  return (
    <Modal transparent={true} animationType="fade" visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${Colors.FONTS}B3`,
        }}>
        <View
          style={{
            height: '40%',
            width: '90%',
            margin: 20,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 20,
            alignItems: 'center',
            overflow: 'hidden',
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
              Add Case
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesome5 name={'times'} size={25} color={Colors.FONTS} />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[Fonts.H4, {marginBottom: 5, width: '100%'}]}>
              SS-{userIdentification}
            </Text>
            <Text style={[Fonts.BODY, {marginBottom: 20}]}>
              This will detect exposed and potential of this user.
            </Text>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <PickerCustom
              datas={statuses}
              text="Status"
              setValue={setStatus}
              value={status}
            />
          </View>
          <Button
            status={false}
            text="Continue"
            backgroundColor={Colors.LGREEN}
            color={Colors.PRIMARY}
            styles={{marginTop: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

const AddCase = props => {
  const {navigation, userID} = props;
  const [scan, setScan] = useState(true);
  const [light, setLight] = useState(false);
  const [camera, setCamera] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('0000');
  const scanner = useRef();

  const [success, setSuccess] = useState(false);

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  useEffect(() => {
    if (alert == false) {
      if (success == true) {
        navigation.goBack();
      }
    }
  }, [alert]);

  const successRead = async e => {
    // await ScanApi(
    //   userID,
    //   e.data,
    //   setAlert,
    //   setAlertTitle,
    //   setAlertInfo,
    //   setAlertColor,
    //   setSuccess,
    // );
    setScan(!scan);
    console.log(e.data);
    setMode(e.data);
    setModalVisible(true);
  };

  return (
    <View style={[styles.scan]}>
      <Alert
        status={alert}
        setStatus={setAlert}
        title={alertTitle}
        info={alertInfo}
        color={alertColor}
      />
      <ModalCase
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mode={mode}
      />
      <Header style={styles.header} navigation={navigation} title="Add Case" />

      {scan ? (
        <QRCodeScanner
          ref={scanner}
          onRead={e => successRead(e)}
          flashMode={
            light
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          showMarker={true}
          fadeIn={scan}
          cameraType={camera ? 'back' : 'front'}
          customMarker={
            <View style={styles.markerView}>
              <Image source={Icons.scannericon} style={styles.scannerIcon} />
            </View>
          }
          cameraStyle={styles.cameraStyle}
        />
      ) : (
        <></>
      )}
      <View style={styles.customNav}>
        <View style={styles.navBox}>
          <TouchableOpacity
            onPress={() => setLight(!light)}
            style={styles.btnSide}>
            <FontAwesome5 name="bolt" size={25} color={Colors.FONTS} />
            <Text style={[Fonts.H5, styles.textBtn]}>Flash</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setScan(!scan);
              scanner?.current?.reactivate();
            }}
            style={[
              styles.btnCenter,
              {
                backgroundColor: scan
                  ? Colors.LGREEN + 'B3'
                  : Colors.LRED + 'B3',
              },
            ]}>
            <View
              style={[
                styles.btnCenterBox,
                {backgroundColor: scan ? Colors.LGREEN : Colors.LRED},
              ]}>
              <FontAwesome5 name="qrcode" size={30} color={Colors.PRIMARY} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCamera(!camera)}
            style={styles.btnSide}>
            <FontAwesome5 name="share" size={25} color={Colors.FONTS} />
            <Text style={[Fonts.H5, styles.textBtn]}>Switch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scan: {flex: 1, backgroundColor: Colors.MAIN},
  header: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
    paddingTop: Padding.CONTAINER.paddingTop,
  },
  markerView: {
    height: '35%',
    width: '75%',
    marginBottom: 100,
  },
  scannerIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  cameraStyle: {
    height: '100%',
  },
  customNav: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
    overflow: 'hidden',
  },
  navBox: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnSide: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnCenter: {
    height: 80,
    width: 80,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnCenterBox: {
    height: 70,
    width: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    marginTop: 5,
  },
});

const mapStatetoProps = state => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(AddCase);
