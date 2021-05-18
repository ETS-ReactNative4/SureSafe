const URI = 'https://tidy-moth-74.loca.lt/suresafe/api';

export default TracingAPI = async (userID, geolocation) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      _id: userID,
      geolocation: geolocation,
    }),
  };

  const response = await fetch(`${URI}/tracing/send`, options);
  const resData = await response.json();
  console.log(resData);
};
