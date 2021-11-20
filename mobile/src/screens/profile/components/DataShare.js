import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
import validator from 'validator';

import {Colors, Fonts, Padding, Icons} from '_styles';
import {Button, Input} from '_components';

const ModalQrCode = ({modalVisible, setModalVisible, mode, data}) => {
  const [code, setCode] = useState('');
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
              Profile
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
            {mode ? 'Share Data' : 'Contact Tracer'}
          </Text>
          <Text style={[Fonts.BODY, {marginBottom: 20, paddingHorizontal: 35}]}>
            {mode
              ? 'Please share this QR Code to contact tracers. Thank you!'
              : 'Please enter the code from the admin of SureSafe. Thank you!'}
          </Text>
          {mode ? (
            <QRCode
              value={data?.userID}
              size={280}
              logo={Icons.sureSafeLogo}
              logoSize={70}
              logoBackgroundColor="transparent"
              color={Colors.FONTS}
            />
          ) : (
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <Input
                validator={validator.isAlphanumeric}
                placeholder="Code"
                value={code}
                onChangeText={setCode}
              />
            </View>
          )}
          {mode ? (
            <></>
          ) : (
            <Button
              status={false}
              text="Close"
              backgroundColor={Colors.LGREEN}
              color={Colors.PRIMARY}
              onPress={() => setModalVisible(false)}
            />
          )}
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
          <Text style={Fonts.H5}>Share my Data</Text>
          <Text style={[Fonts.LIGHT, {marginTop: 3}]}>
            Last share: {lastLogs}
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
        <FontAwesome5 name={'qrcode'} solid size={35} color={Colors.LORANGE} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: 'auto',
          }}>
          <Text style={Fonts.H5}>Contact Tracer</Text>
          <Text style={[Fonts.LIGHT, {marginTop: 3}]}>
            This will make you a contact tracer
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
