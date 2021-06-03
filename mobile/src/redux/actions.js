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

const setLocalStorage = data => {
  return {
    type: 'SETLOCALSTORAGE',
    payload: data,
  };
};

export {setUserID, setUserToken, setLocalStorage};
