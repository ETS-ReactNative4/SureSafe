import React, {useState} from 'react';
import {View, Text} from 'react-native';
import validator from 'validator';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, Button, Alert} from '../../components';
import {Title} from './components';

export default Address = ({navigation}) => {
  // States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  const onSubmit = () => {
    if (firstName == '') {
      setAlertTitle('First Name is Required!');
      setAlertInfo('Please enter your First Name.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isAlpha(firstName)) {
      setAlertTitle('Invalid First Name!');
      setAlertInfo('Please enter a valid First Name no numbers.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (lastName == '') {
      setAlertTitle('Last Name is Required!');
      setAlertInfo('Please enter your Last Name.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isAlpha(lastName)) {
      setAlertTitle('Invalid First Name!');
      setAlertInfo('Please enter a valid Last Name no numbers.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (municipality == '') {
      setAlertTitle('Select Municipality!');
      setAlertInfo(
        'Municipality is required. Please select your municipality.',
      );
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (barangay == '') {
      setAlertTitle('Select Barangay!');
      setAlertInfo('Barangay is required. Please select your barangay.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else {
      navigation.navigate('Number');
    }
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
          text="Next"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
};
