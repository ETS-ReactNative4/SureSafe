import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, PasswordInput, Button, Alert} from '../../components';
import {Title} from './components';
import {LoginAPI} from './api';
import {getKeys} from '../../utils';
import {setLocalStorage} from '../../redux/actions';

const Login = props => {
  const {navigation, dispatch, state} = props;
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Design States
  const [passwordShow, setPasswordShow] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (alert == false) {
      if (success == true) {
        setBtnStatus(false);
        const GET = async () => {
          const DATA = await getKeys();
          dispatch(setLocalStorage(DATA));
          navigation.reset({
            index: 0,
            routes: [{name: 'TabNavigation'}],
          });
        };
        GET();
      } else {
        setBtnStatus(false);
      }
    }
  }, [alert]);

  const onSubmit = async () => {
    setBtnStatus(true);
    LoginAPI(
      email,
      password,
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
          title="SureSafe"
          info="Protect yourself, your family , and your community to prevent COVID-19
        from spreding."
          font={Fonts.TITLE}
          center={false}
        />
      </View>

      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>Login</Text>
        <Input
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          login={true}
        />
        <PasswordInput
          onPress={() => setPasswordShow(!passwordShow)}
          placeholder="Password"
          state={passwordShow}
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
          login={true}
        />
        <Button
          text="Log in"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          status={btnStatus}
          onPress={() => onSubmit()}
        />
        <Button
          text="Forgot password?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.FONTS}
        />
        <Button
          onPress={() => navigation.navigate('Create')}
          text="Create account?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.GREY}
        />
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    state: state,
  };
};

export default connect(mapStatetoProps)(Login);
