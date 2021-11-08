import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import validator from 'validator';
import {connect} from 'react-redux';

import {Fonts, Padding, Colors, Defaults} from '_styles';
import {Input, PasswordInput, Button, Alert} from '_components';
import {Title, CheckBox} from './components';
import {CreateAPI} from './api';

const Create = props => {
  const {navigation, dispatch, userID} = props;
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [success, setSuccess] = useState(false);

  // Design States
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (alert === false) {
      if (success === true) {
        setBtnStatus(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Information'}],
        });
      } else {
        setBtnStatus(false);
      }
    }
  }, [alert]);

  const onSubmit = async () => {
    setBtnStatus(true);
    CreateAPI(
      email,
      password,
      confirm,
      agreement,
      setAlert,
      setAlertTitle,
      setAlertInfo,
      setAlertColor,
      setSuccess,
      dispatch,
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
        <CheckBox
          onPress={() => setAgreement(!agreement)}
          checked={agreement}
        />
        <Button
          text="Create Account"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => onSubmit()}
          status={btnStatus}
        />
        <Button
          text="Already have an account?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.GREY}
          onPress={() => navigation.navigate('Login')}
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

export default connect(mapStatetoProps)(Create);
