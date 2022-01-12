import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {Fonts, Padding, Colors, Defaults, Margin} from '_styles';
import {Button, Alert} from '_components';
import {Title, NumberButton, CodeInput} from './components';
import {CodeAPI} from './api';
import {getKeys} from '_utils';
import {setLocalStorage} from '_redux';

const Code = props => {
  const {navigation, userID, dispatch, route} = props;

  // States
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const date = new Date();

  // Design States
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const [alertColor, setAlertColor] = useState(Colors.LGREEN);
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (alert === false) {
      if (success === true) {
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
    CodeAPI(
      userID,
      code,
      date,
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
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 0,
          },
        ]}>
        <Title
          title="Enter code sent to your Number"
          info={`We sent it to the number +63${route.params.number}`}
          font={Fonts.H2}
          center={true}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: Margin.INPUT,
          }}>
          <CodeInput value={code.charAt(0)} />
          <CodeInput value={code.charAt(1)} />
          <CodeInput value={code.charAt(2)} />
          <CodeInput value={code.charAt(3)} />
        </View>
        <Button
          status={btnStatus}
          text="Verify"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => onSubmit()}
        />
      </View>
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={1} onPress={() => setCode(code + '1')} />
          <NumberButton
            number={2}
            margin={true}
            onPress={() => setCode(code + '2')}
          />
          <NumberButton number={3} onPress={() => setCode(code + '3')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={4} onPress={() => setCode(code + '4')} />
          <NumberButton
            number={5}
            margin={true}
            onPress={() => setCode(code + '5')}
          />
          <NumberButton number={6} onPress={() => setCode(code + '6')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <NumberButton number={7} onPress={() => setCode(code + '7')} />
          <NumberButton
            number={8}
            margin={true}
            onPress={() => setCode(code + '8')}
          />
          <NumberButton number={9} onPress={() => setCode(code + '9')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <NumberButton
            number={0}
            margin={true}
            onPress={() => setCode(code + '0')}
          />
          <NumberButton
            icons={true}
            onPress={() =>
              code.length > 4
                ? setCode(code.substr(0, 3))
                : setCode(code.slice(0, -1))
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

export default connect(mapStatetoProps)(Code);
