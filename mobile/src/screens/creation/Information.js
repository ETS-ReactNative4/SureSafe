import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import validator from 'validator';
import {connect} from 'react-redux';

import {Fonts, Padding, Colors, Defaults} from '_styles';
import {Input, Button, Alert} from '_components';
import {Title} from './components';
import {InformationAPI} from './api';

const Infomation = props => {
  const {navigation, userID} = props;
  // States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [success, setSuccess] = useState(false);

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (alert == false) {
      if (success == true) {
        setBtnStatus(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Number'}],
        });
      } else {
        setBtnStatus(false);
      }
    }
  }, [alert]);

  const onSubmit = async () => {
    setBtnStatus(true);
    InformationAPI(
      userID,
      firstName,
      lastName,
      municipality,
      barangay,
      setAlert,
      setAlertTitle,
      setAlertInfo,
      setAlertColor,
      setSuccess,
    );
  };

  return (
    <View style={Defaults.Creation.backgorund}>
      <Alert
        status={alert}
        setStatus={setAlert}
        title={alertTitle}
        info={alertInfo}
        color={alertColor}
      />
      <View
        style={[
          Padding.CREATION,
          {flex: 1, justifyContent: 'center', paddingBottom: 0},
        ]}>
        <Title
          title="More Info."
          info="Please enter your address for us to easilly find you in case of
        emergency. We don't share your information with others."
          font={Fonts.TITLE}
          center={false}
        />
      </View>

      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>Information</Text>
        <Input
          validator={validator.isAlpha}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          validator={validator.isAlpha}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Picker
          text={'Municipality'}
          value={municipality}
          setValue={setMunicipality}
        />
        <Picker
          text={'Barangay'}
          value={barangay}
          setValue={setBarangay}
          barangay={true}
          municipality={municipality}
        />
        <Button
          status={btnStatus}
          text="Next"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Infomation);
