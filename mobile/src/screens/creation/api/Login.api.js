import {API} from '../../../constant';

import {Colors} from '../../../styles';
import {setUserToken, setUserID} from '../../../redux/actions';

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
    const response = await fetch(`${API}/users/login`, options);
    const resData = await response.json();
    if (response.status == 200) {
      console.log(resData);
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LGREEN);
      setAlert(true);
      setSuccess(true);
      dispatch(setUserToken(resData));
      dispatch(setUserID(resData.userID));
    } else {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LRED);
      setAlert(true);
    }
  }
};
