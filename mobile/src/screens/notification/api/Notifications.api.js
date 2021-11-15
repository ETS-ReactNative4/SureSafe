import {API} from '_constants';

export const NotificationAPI = async (userData, setData) => {
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
    `${API}/users/notifications/${userData.userID}`,
    options,
  );
  const resData = await response.json();
  setData(resData);
};
