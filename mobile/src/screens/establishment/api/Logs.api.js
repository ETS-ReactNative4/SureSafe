import {API} from '_constants';

export const LogsAPI = async (userID, setData) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(`${API}/tracing/get/${userID}`, options);
  const resData = await response.json();
  setData(resData);
};
