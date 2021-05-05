const setUserID = userID => {
  return {
    type: 'SETUSERID',
    payload: userID,
  };
};

const setUserToken = data => {
  return {
    type: 'SETUSERTOKEN',
    payload: data,
  };
};

export {setUserID, setUserToken};
