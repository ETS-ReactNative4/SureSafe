import {API} from '_constants';

export const VisitsAPI = async (userID, setData, filter) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(
    `${API}/establishment/getVisits/${userID}?filter=${filter}`,
    options,
  );
  const resData = await response.json();
  setData(resData);
};
