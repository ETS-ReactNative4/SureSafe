import {API} from '_constants';

import {setUserToken} from '_redux';
import {Colors} from '_styles';

export const CodeAPI = async (
  userID,
  code,
  date,
  setAlert,
  setAlertTitle,
  setAlertInfo,
  setAlertColor,
  setSuccess,
  dispatch,
) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      _id: userID,
      code: code,
      date: date,
    }),
  };

  if (code === '') {
    setAlertTitle('Number is Required!');
    setAlertInfo('Please enter the code we sent you to verify your account.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (code.length != 4) {
    setAlertTitle('Invalid Code!');
    setAlertInfo('Please enter a valid Code.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${API}/users/checkOTP`, options);
    const resData = await response.json();
    if (response.status === 202) {
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
