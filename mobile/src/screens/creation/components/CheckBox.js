import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Defaults, Fonts, Colors} from '_styles';

export default CheckBox = props => {
  const {onPress, checked} = props;
  return (
    <View style={styles.checkbox}>
      <TouchableOpacity
        style={[
          styles.checkboxBTN,
          {backgroundColor: checked ? Colors.LGREEN : Colors.PRIMARY},
        ]}
        onPress={onPress}>
        <FontAwesome5 name={'check'} color={Colors.PRIMARY} size={15} />
      </TouchableOpacity>
      <Text style={[Fonts.BODY, styles.text]}>
        I agree to the Terms & Condition and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxBTN: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 10,
  },
  text: {
    fontSize: Fonts.BODY.fontSize - 2,
    paddingHorizontal: 10,
    flex: 1,
    lineHeight: 20,
  },
});
