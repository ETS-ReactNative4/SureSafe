import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from '_styles';
import {ScanCard, Button} from '_components';

const ModalNotification = ({
  item,
  title,
  permission,
  modalVisible,
  setModalVisible,
}) => {
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
            height: '45%',
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
              Notification
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesome5 name={'times'} size={25} color={Colors.FONTS} />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[Fonts.H4, {marginBottom: 5, width: '100%'}]}>
              {`Status: ${title}`}
            </Text>
            <Text style={[Fonts.BODY, {marginBottom: 20}]}>
              You have been exposed to this SureSafe user. Please do self
              quarantine in 15 days. Thank you!
            </Text>
            <ScanCard item={item} notif={true} />
          </View>
          <Button
            disabled={!permission}
            status={false}
            text="Share my data"
            backgroundColor={permission ? Colors.LGREEN : Colors.GREY}
            color={Colors.PRIMARY}
            styles={{marginTop: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NotificationCard = props => {
  const {isSelected, permission, title, info, time, data} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const boxColor = isSelected ? Colors.PRIMARY : Colors.SECONDARY;
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.main, {backgroundColor: boxColor}]}>
      <ModalNotification
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={data}
        title={title}
        permission={permission}
      />
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.iconBox,
            {backgroundColor: permission ? Colors.LRED : Colors.YELLOW},
          ]}>
          <FontAwesome5
            name={'exclamation-triangle'}
            size={25}
            color={Colors.FONTS}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={Fonts.H5}>
            {title} <Text style={Fonts.LIGHT}>{info}</Text>
          </Text>
          <Text style={Fonts.LIGHT}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 7,
  },
  iconBox: {
    height: 60,
    width: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
