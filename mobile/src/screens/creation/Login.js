import React, {useState} from 'react';
import {View, Text} from 'react-native';
import validator from 'validator';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, PasswordInput, Button} from '../../components';
import {Title} from './components';

export default Login = ({navigation}) => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Design States
  const [passwordShow, setPasswordShow] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);

  const onSubmit = () => {
    if (email == '') {
      setAlertTitle('Email is Empty!');
      setAlertInfo('Please enter your email.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isEmail(email)) {
      setAlertTitle('Invalid Email!');
      setAlertInfo('Please enter a valid email address.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (password == '') {
      setAlertTitle('Password is Empty!');
      setAlertInfo('Please enter your password.');
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
    } else if (!validator.isStrongPassword(password)) {
      setAlertTitle('Invalid Password!');
      setAlertInfo(
        'Password must be atleast 8 characters, 1 number, 1 symbol, 1 lowercase and uppercase',
      );
      setAlertColor(Colors.LYELLOW);
      setAlert(true);
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
        <Button
          text="Log in"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'TabNavigation'}],
            })
          }
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
