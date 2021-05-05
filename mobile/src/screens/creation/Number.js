import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import validator from 'validator';
import {connect} from 'react-redux';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, Button} from '../../components';
import {Title, NumberButton} from './components';
import {NumberAPI} from './api';

const Number = props => {
  const {navigation, userID} = props;
  // States
  const [number, setNumber] = useState('');
  const [success, setSuccess] = useState(false);
  const date = new Date();

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
          routes: [{name: 'Code'}],
        });
      } else {
        setBtnStatus(false);
      }
    }
  }, [alert]);

  const onSubmit = async () => {
    setBtnStatus(true);
    NumberAPI(
      userID,
      number,
      date,
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
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 0,
          },
        ]}>
        <Title
          title="Enter your mobile number"
          info="You will recieve a 4 digit code for verification purposes."
          font={Fonts.H2}
          center={true}
        />
        <Input
          placeholder="Eg. 9356555717"
          validator={validator.isMobilePhone}
          value={number.length > 10 ? number.substr(0, 10) : number}
          onChangeText={setNumber}
          showSoftInputOnFocus={true}
        />
        <Button
          status={btnStatus}
          onPress={() => onSubmit()}
          text="Send OTP"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
        />
      </View>
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={1} onPress={() => setNumber(number + '1')} />
          <NumberButton
            number={2}
            margin={true}
            onPress={() => setNumber(number + '2')}
          />
          <NumberButton number={3} onPress={() => setNumber(number + '3')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={4} onPress={() => setNumber(number + '4')} />
          <NumberButton
            number={5}
            margin={true}
            onPress={() => setNumber(number + '5')}
          />
          <NumberButton number={6} onPress={() => setNumber(number + '6')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={7} onPress={() => setNumber(number + '7')} />
          <NumberButton
            number={8}
            margin={true}
            onPress={() => setNumber(number + '8')}
          />
          <NumberButton number={9} onPress={() => setNumber(number + '9')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <NumberButton
            number={0}
            margin={true}
            onPress={() => setNumber(number + '0')}
          />
          <NumberButton
            icons={true}
            onPress={() =>
              number.length > 10
                ? setNumber(number.substr(0, 9))
                : setNumber(number.slice(0, -1))
            }
          />
        </View>
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Number);
