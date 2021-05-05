const initialState = {
  onboardingDone: true,
  userID: '',
  token: '',
  verified: false,
  loggedIN: false,
};

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETONBOARDDONE':
      return {
        ...state,
        onboardingDone: action.payload,
      };
    case 'SETUSERID':
      return {
        ...state,
        userID: action.payload,
      };
    case 'SETUSERTOKEN':
      return {
        ...state,
        token: action.payload.token,
        verified: action.payload.verified,
        loggedIN: action.payload.loggedIN,
      };
    default:
      return state;
  }
};
