import {API} from '_constants';

export const ProfileAPI = async (userData, setData) => {
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
    `${API}/users/profile/${userData.userID}`,
    options,
  );
  const resData = await response.json();
  setData(resData);
};
