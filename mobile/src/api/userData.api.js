const URI = 'http://localhost:3001/suresafe/api';

export default userData = async (userID, token) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
      authToken: token,
    },
  };

  const response = await fetch(`${URI}/users/user/${userID}`, options);
  const resData = await response.json();

  return resData;
};
