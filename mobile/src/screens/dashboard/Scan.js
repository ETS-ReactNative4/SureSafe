import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding, Icons} from '../../styles';
import {Header, Button} from '../../components';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default Scan = ({navigation}) => {
  const [scan, setScan] = useState(false);
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <Header
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          paddingTop: Padding.CONTAINER.paddingTop,
        }}
        navigation={navigation}
        title="Scan"
      />
      <QRCodeScanner
        onRead={e => console.log(e)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        customMarker={
          <View
            style={{
              height: '35%',
              width: '75%',
              marginBottom: 100,
            }}>
            <Image
              source={Icons.scannericon}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
        }
        cameraStyle={{
          height: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          zIndex: 1,
          width: '100%',
          paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <FontAwesome5 name="bolt" size={25} color={Colors.FONTS} />
            <Text style={[Fonts.H5, {marginTop: 5}]}>Flash</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 80,
              width: 80,
              borderRadius: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.LGREEN + 'B3',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <View
              style={{
                height: 70,
                width: 70,
                borderRadius: 70,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.LGREEN,
              }}>
              <FontAwesome5 name="qrcode" size={30} color={Colors.PRIMARY} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <FontAwesome5 name="share" size={25} color={Colors.FONTS} />
            <Text style={[Fonts.H5, {marginTop: 5}]}>Switch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
