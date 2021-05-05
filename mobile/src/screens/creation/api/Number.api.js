const URI = 'http://localhost:3001/suresafe/api';

import {Colors} from '../../../styles';
import validator from 'validator';

export default NumberAPI = async (
  userID,
  number,
  date,
  setAlert,
  setAlertTitle,
  setAlertInfo,
  setAlertColor,
  setSuccess,
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
      number: number,
      date: date,
    }),
  };

  if (number == '') {
    setAlertTitle('Number is Required!');
    setAlertInfo('Please enter your phone number to verify your account.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (!validator.isMobilePhone(number)) {
    setAlertTitle('Invalid Number!');
    setAlertInfo('Please enter a valid Phone Number.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${URI}/users/addnumber`, options);
    const resData = await response.json();

    if (response.status == 201) {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LGREEN);
      setAlert(true);
      setSuccess(true);
    } else {
      setAlertTitle(resData.title);
      setAlertInfo(resData.message);
      setAlertColor(Colors.LRED);
      setAlert(true);
    }
  }
};
