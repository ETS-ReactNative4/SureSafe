import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding} from '../../styles';
import {Header, Button} from '../../components';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default Scan = ({navigation}) => {
  const [scan, setScan] = useState(false);
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <QRCodeScanner
        onRead={e => console.log(e)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={<Header navigation={navigation} title="Scan" />}
      />
      {/* <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Header navigation={navigation} title="Scan" />
      </View>

      <View style={{flex: 0.3, backgroundColor: Colors.PRIMARY}}>
        <View
          style={{
            width: '100%',
            paddingVertical: 15,
            backgroundColor: scan ? Colors.LGREEN : Colors.LRED,
            alignItems: 'center',
          }}>
          <Text style={[Fonts.H4, {color: Colors.PRIMARY}]}>
            {scan ? 'Visit Added' : 'Scanner is Off'}
          </Text>
        </View>

        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
          <Button
            text="Check"
            status={false}
            backgroundColor={Colors.LBLUE}
            color={Colors.PRIMARY}
            styles={{
              flex: 1,
              height: 50,
              borderRadius: 15,
              marginHorizontal: 3,
            }}
          />
          <Button
            text="Check"
            status={false}
            backgroundColor={Colors.LBLUE}
            color={Colors.PRIMARY}
            styles={{
              flex: 1,
              height: 50,
              borderRadius: 15,
              marginHorizontal: 3,
            }}
          />
          <Button
            text="Check"
            status={false}
            backgroundColor={Colors.LBLUE}
            color={Colors.PRIMARY}
            styles={{
              flex: 1,
              height: 50,
              borderRadius: 15,
              marginHorizontal: 3,
            }}
          />
        </View>
      </View> */}
    </View>
  );
};
