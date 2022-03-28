import {API} from '_constants';

import {Colors} from '_styles';
import {setEstabToken, setUserID} from '_redux';

export const LoginEstablishmentAPI = async (
  email,
  password,
  setAlert,
  setAlertTitle,
  setAlertInfo,
  setAlertColor,
  setSuccess,
  dispatch,
) => {
  console.log('API', API);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  if (email === '') {
    setAlertTitle('Email is Empty!');
    setAlertInfo('Please enter your email.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (password === '') {
    setAlertTitle('Password is Empty!');
    setAlertInfo('Please enter your password.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${API}/establishment/login`, options);
    const resData = await response.json();
    console.log('resData', resData);
    if (response.status === 200) {
      console.log(resData);
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LGREEN);
      setAlert(true);
      setSuccess(true);
      // dispatch(setEstabToken(resData));
      dispatch(setUserID(resData.userID));
    } else {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LRED);
      setAlert(true);
    }
  }
};
