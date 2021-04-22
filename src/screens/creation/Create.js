import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import validator from 'validator';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, PasswordInput, Button, Alert} from '../../components';
import {Title, CheckBox} from './components';

export default Create = ({props, navigation}) => {
  //Props
  const {navigate} = navigation;

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [checked, setChecked] = useState(false);

  // Design States
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  const onSubmit = () => {
    if (email == '') {
      setAlertTitle('Email is Required!');
      setAlertInfo('Email address is required to create a account.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isEmail(email)) {
      setAlertTitle('Invalid Email!');
      setAlertInfo('Please enter a valid email address.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (password == '') {
      setAlertTitle('Password is Required!');
      setAlertInfo('Password is required to create a account.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isStrongPassword(password)) {
      setAlertTitle('Invalid Password!');
      setAlertInfo(
        'Password must be atleast 8 characters, 1 number, 1 symbol, 1 lowercase and uppercase',
      );
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (confirm == '') {
      setAlertTitle('Confirm your Password!');
      setAlertInfo('Please confirm your password to create a account.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (confirm != password) {
      setAlertTitle("Password doesn't match!");
      setAlertInfo(
        "Your password doesn't match. Please confirm your password.",
      );
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!checked) {
      setAlertTitle('Agreement is Required!');
      setAlertInfo(
        'You must agree to our Terms & Condition and Privacy Policy to create an account!',
      );
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else {
      navigate('Information');
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
          title="Create Now!"
          info="Create your account now. Let's help each other to end this pandemic!"
          font={Fonts.TITLE}
          center={false}
        />
      </View>

      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>
          Create Account
        </Text>
        <Input
          placeholder="Email Address"
          validator={validator.isEmail}
          value={email}
          onChangeText={setEmail}
        />
        <PasswordInput
          onPress={() => setPasswordShow(!passwordShow)}
          placeholder="Password"
          state={passwordShow}
          validator={validator.isStrongPassword}
          options={{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }}
          value={password}
          onChangeText={setPassword}
          confirmpassword={false}
        />
        <PasswordInput
          onPress={() => setConfirmShow(!confirmShow)}
          placeholder="Confirm Password"
          state={confirmShow}
          validator={password}
          value={confirm}
          onChangeText={setConfirm}
          confirmpassword={true}
        />
        <CheckBox onPress={() => setChecked(!checked)} checked={checked} />
        <Button
          text="Create Account"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => onSubmit()}
        />
        <Button
          text="Already have an account?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.GREY}
          onPress={() => navigate('Login')}
        />
      </View>
    </View>
  );
};
