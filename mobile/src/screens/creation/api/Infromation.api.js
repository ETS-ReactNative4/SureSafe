const URI = 'http://localhost:3001/suresafe/api';

import {Colors} from '../../../styles';
import validator from 'validator';

export default InformationAPI = async (
  userID,
  firstName,
  lastName,
  municipality,
  barangay,
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
      firstName: firstName,
      lastName: lastName,
      municipality: municipality,
      barangay: barangay,
    }),
  };

  if (firstName == '') {
    setAlertTitle('First Name is Required!');
    setAlertInfo('Please enter your First Name.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (!validator.isAlpha(firstName)) {
    setAlertTitle('Invalid First Name!');
    setAlertInfo('Please enter a valid First Name no numbers.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (lastName == '') {
    setAlertTitle('Last Name is Required!');
    setAlertInfo('Please enter your Last Name.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (!validator.isAlpha(lastName)) {
    setAlertTitle('Invalid First Name!');
    setAlertInfo('Please enter a valid Last Name no numbers.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (municipality == '') {
    setAlertTitle('Select Municipality!');
    setAlertInfo('Municipality is required. Please select your municipality.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else if (barangay == '') {
    setAlertTitle('Select Barangay!');
    setAlertInfo('Barangay is required. Please select your barangay.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${URI}/users/addinfo`, options);
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
