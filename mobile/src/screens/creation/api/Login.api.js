const URI = 'http://localhost:3001/suresafe/api';

import {Colors} from '../../../styles';
import {setUserToken} from '../../../redux/actions';

export default LoginAPI = async (
  email,
  password,
  setAlert,
  setAlertTitle,
  setAlertInfo,
  setAlertColor,
  setSuccess,
  dispatch,
) => {
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

  if (email == '') {
    setAlertTitle('Email is Empty!');
    setAlertInfo('Please enter your email.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (password == '') {
    setAlertTitle('Password is Empty!');
    setAlertInfo('Please enter your password.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${URI}/users/login`, options);
    const resData = await response.json();
    if (response.status == 200) {
      console.log(resData);
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LGREEN);
      setAlert(true);
      setSuccess(true);
      dispatch(setUserToken(resData));
    } else {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LRED);
      setAlert(true);
    }
  }
};
