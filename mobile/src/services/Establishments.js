import {API} from '_constants';

export const getEstabData = async userID => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      //   authToken: token,
    },
  };

  const response = await fetch(`${API}/establishment/data/${userID}`, options);
  const resData = await response.json();

  return resData;
};
