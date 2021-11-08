import {API} from '_constants';

export const userData = async (userID, token) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      authToken: token,
    },
  };

  const response = await fetch(`${API}/users/user/${userID}`, options);
  const resData = await response.json();

  return resData;
};
