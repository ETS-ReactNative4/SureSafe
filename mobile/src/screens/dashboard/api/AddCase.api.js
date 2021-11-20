import {API} from '_constants';

export const AddCaseAPI = async (setData, userID, status) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      userID,
      status,
    }),
  };

  const response = await fetch(`${API}/share/logs`, options);
  const resData = await response.json();
  setData(resData);
};
