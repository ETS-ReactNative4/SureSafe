import {API} from '_constants';

import {setUserToken} from '_redux';
import {Colors} from '_styles';

export const ChangeRoleAPI = async (
  userID,
  code,
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
      _id: userID,
      role: 'Contact Tracer',
      code: code,
    }),
  };

  if (code === '') {
    setAlertTitle('Code is Required!');
    setAlertInfo('Please enter the code from the admin of suresafe.');
    setAlertColor(Colors.LYELLOW);
    setAlert(true);
  } else {
    const response = await fetch(`${API}/users/role`, options);
    const resData = await response.json();
    if (response.status === 201) {
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
