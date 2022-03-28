import {API} from '_constants';

import {Colors} from '_styles';

export const ScanAPI = async (
  userID,
  qrcode,
  setAlert,
  setAlertTitle,
  setAlertInfo,
  setAlertColor,
  setSuccess,
) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      userID: qrcode,
      estabID: userID,
    }),
  };

  const response = await fetch(`${API}/establishment/addVisit`, options);
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
};
