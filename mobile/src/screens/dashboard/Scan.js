import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';

import {Colors, Fonts, Padding, Icons} from '../../styles';
import {Header, Alert} from '../../components';
import {ScanApi} from './api';

const Scan = props => {
  const {navigation, userID} = props;
  const [scan, setScan] = useState(true);
  const [light, setLight] = useState(false);
  const [camera, setCamera] = useState(true);
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
    await ScanApi(
      userID,
      e.data,
      setAlert,
      setAlertTitle,
      setAlertInfo,
      setAlertColor,
      setSuccess,
    );
    setScan(!scan);
    console.log(e);
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
      <Header style={styles.header} navigation={navigation} title="Scan" />
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

export default connect(mapStatetoProps)(Scan);
