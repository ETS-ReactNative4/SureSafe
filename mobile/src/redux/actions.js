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

const setEstabToken = data => {
  return {
    type: 'SETESTABLISHMENTTOKEN',
    payload: data,
  };
};

const setLocalStorage = data => {
  return {
    type: 'SETLOCALSTORAGE',
    payload: data,
  };
};

const removeLocalStorage = () => {
  return {
    type: 'REMOVELOCALSTORAGE',
  };
};

const setTracingData = data => {
  return {
    type: 'SETTRACING',
    payload: data,
  };
};

export {
  setUserID,
  setUserToken,
  setLocalStorage,
  removeLocalStorage,
  setTracingData,
  setEstabToken,
};
