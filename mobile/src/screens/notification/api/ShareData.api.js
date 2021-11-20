import {API} from '_constants';

export const ShareDataAPI = async (userData, status) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      authToken: userData.token,
    },
    body: JSON.stringify({
      userID: userData.userID,
      status: status,
    }),
  };

  const response = await fetch(`${API}/share/logs`, options);
  const resData = await response.json();
  return resData;
};
