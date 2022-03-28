import {API} from '_constants';

export const RemoveTracingAPI = async userID => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      _id: userID,
    }),
  };

  const response = await fetch(`${API}/tracing/remove`, options);
  const resData = await response.json();
  console.log('Remove', resData);
};
