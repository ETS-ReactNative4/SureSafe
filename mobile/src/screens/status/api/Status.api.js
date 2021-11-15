import {API} from '_constants';

export const StatusAPI = async (userData, setData) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      authToken: userData.token,
    },
  };

  const response = await fetch(
    `${API}/users/status/${userData.userID}`,
    options,
  );
  const resData = await response.json();
  setData(resData);
};
