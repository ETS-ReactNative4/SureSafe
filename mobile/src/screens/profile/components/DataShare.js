import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';

import {Colors, Fonts, Padding, Icons} from '_styles';
import {Button} from '_components';

const ModalQrCode = ({modalVisible, setModalVisible, mode, data}) => {
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
            height: '64%',
            width: '90%',
            margin: 20,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 35,
            alignItems: 'center',
          }}>
          <Text
            style={[
              Fonts.H4,
              {marginBottom: 5, width: '100%', paddingLeft: 13},
            ]}>
            {mode ? 'Share Geo Tracing' : 'Share Visits'}
          </Text>
          <Text style={[Fonts.BODY, {marginBottom: 20}]}>
            Please share this QR Code to contact tracers.
          </Text>
          <QRCode
            value={data?.userID}
            size={280}
            logo={Icons.sureSafeLogo}
            logoSize={70}
            logoBackgroundColor="transparent"
            color={Colors.FONTS}
          />
          <Button
            status={false}
            text="Close"
            backgroundColor={Colors.LGREEN}
            color={Colors.PRIMARY}
            styles={{marginTop: 25}}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export const DataShare = ({data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const lastLogs =
    data?.lastLogs === 'None' ? 'N/A' : data?.lastLogs.substr(0, 15);
  const lastVisits =
    data?.lastVisits === 'None' ? 'N/A' : data?.lastVisits.substr(0, 15);
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
        data={data}
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
          color={Colors.LBLUE}
        />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 13,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share my Geo Tracing</Text>
          <Text style={Fonts.LIGHT}>Last share: {lastLogs}</Text>
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
        <FontAwesome5 name={'qrcode'} solid size={35} color={Colors.LORANGE} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Share my Visits</Text>
          <Text style={Fonts.LIGHT}>Last share: {lastVisits}</Text>
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
