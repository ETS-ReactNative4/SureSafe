import validator from 'validator';
import {API} from '../../../constant';

import {Colors} from '../../../styles';
import {setUserID} from '../../../redux/actions';

export default CreateAPI = async (
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
      agreement: agreement,
    }),
  };

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
    setAlertInfo("Your password doesn't match. Please confirm your password.");
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (!agreement) {
    setAlertTitle('Agreement is Required!');
    setAlertInfo(
      'You must agree to our Terms & Condition and Privacy Policy to create an account!',
    );
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${API}/users/create`, options);
    const resData = await response.json();

    if (response.status == 201) {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LGREEN);
      setAlert(true);
      setSuccess(true);
      dispatch(setUserID(resData.user));
    } else {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LRED);
      setAlert(true);
    }
  }
};
