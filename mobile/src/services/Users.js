import {API} from '_constants';

export const shareDataExposed = async userID => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      //   authToken: token,
    },
  };

  const response = await fetch(`${API}/share/logs/exposed/${userID}`, options);
  const resData = await response.json();

  return resData;
};

export const shareDataInfected = async userID => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      //   authToken: token,
    },
  };

  const response = await fetch(`${API}/share/logs/infected/${userID}`, options);
  const resData = await response.json();

  return resData;
};
