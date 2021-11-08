import {API} from '_constants';

export const UpdatesAPI = async setData => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(`${API}/cases/updates`, options);
  const resData = await response.json();
  setData(resData);
};
