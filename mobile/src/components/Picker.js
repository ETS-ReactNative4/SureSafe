import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Defaults, Colors, Fonts} from '_styles';
import Data from '../assets/json/IlocosSur.json';
export default Picker = props => {
  const {text, value, barangay, setValue, municipality} = props;

  const [modalVisible, setModalVisible] = useState(false);

  let renderObjects = [];
  let renderArray = [];
  for (let key of Object.keys(Data)) {
    renderObjects.push(
      <TouchableOpacity
        key={key}
        onPress={() => {
          setValue(key);
          setModalVisible(!modalVisible);
        }}
        style={{
          width: '100%',
          backgroundColor: Colors.SECONDARY,
          marginVertical: 5,
          borderRadius: 15,
          paddingHorizontal: 20,
          paddingVertical: 15,
          justifyContent: 'center',
        }}>
        <Text style={Fonts.BODY}>{key}</Text>
      </TouchableOpacity>,
    );
  }
  const datas = Data[municipality ? municipality : 'BANTAY'].barangay_list;
  for (let i = 0; i < datas.length; i++) {
    renderArray.push(
      <TouchableOpacity
        key={i}
        onPress={() => {
          setValue(datas[i]);
          setModalVisible(!modalVisible);
        }}
        style={{
          width: '100%',
          backgroundColor: Colors.SECONDARY,
          marginVertical: 5,
          borderRadius: 15,
          paddingHorizontal: 20,
          paddingVertical: 15,
          justifyContent: 'center',
        }}>
        <Text style={Fonts.BODY}>{datas[i]}</Text>
      </TouchableOpacity>,
    );
  }

  const checkModal = () => {
    if (text == 'Municipality') {
      setModalVisible(!modalVisible);
    } else if (text == 'Barangay' && municipality == '') {
      Alert.alert('Select Municipality!', 'Please select Municipality first!', [
        ,
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => checkModal()}
      style={[Defaults.Input, {alignItems: 'center', flexDirection: 'row'}]}>
      <Text style={[Fonts.BODY, {marginRight: 'auto'}]}>
        {value == '' ? text : value}
      </Text>
      <FontAwesome5
        name={'caret-down'}
        solid
        style={{
          color: Colors.FONTS,
        }}
        size={25}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => checkModal()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[Fonts.H4, {marginLeft: 15, marginBottom: 10}]}>
              Select {text}
            </Text>
            <ScrollView>
              {barangay == true ? renderArray : renderObjects}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.FONTS}B3`,
  },
  modalView: {
    height: '70%',
    width: '90%',
    margin: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
});
