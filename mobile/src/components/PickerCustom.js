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
export default PickerCustom = props => {
  const {text, value, setValue, datas} = props;

  const [modalVisible, setModalVisible] = useState(false);

  let renderArray = [];
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

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(!modalVisible)}
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
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[Fonts.H4, {marginLeft: 15, marginBottom: 10}]}>
              Select {text}
            </Text>
            <ScrollView>{renderArray}</ScrollView>
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
