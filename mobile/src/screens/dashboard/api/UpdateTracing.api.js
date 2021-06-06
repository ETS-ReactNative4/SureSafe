import {API} from '../../../constant';

export default UpdateTracingAPI = async userID => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(`${API}/tracing/update/${userID}`, options);
  const resData = await response.json();
  return resData.data;
};
