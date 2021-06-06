import {useLocalStorage} from '../hooks/';

const initialState = {
  onboardingDone: false,
  userID: '',
  token: '',
  verified: false,
  loggedIN: false,
  userData: {},
  tracingData: [],
};

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETONBOARDDONE':
      useLocalStorage('ONBOARD', 'SET', action.payload, true);
      return {
        ...state,
        onboardingDone: action.payload,
      };
    case 'SETUSERID':
      useLocalStorage('USERID', 'SET', action.payload, false);
      return {
        ...state,
        userID: action.payload,
      };
    case 'SETUSERTOKEN':
      useLocalStorage('USERTOKEN', 'SET', action.payload.token, false);
      useLocalStorage('VERIFIED', 'SET', action.payload.verified, true);
      useLocalStorage('LOGGEDIN', 'SET', action.payload.loggedIN, true);
      return {
        ...state,
        token: action.payload.token,
        verified: action.payload.verified,
        loggedIN: action.payload.loggedIN,
      };
    case 'SETLOCALSTORAGE':
      return {
        onboardingDone: action.payload,
        userID: action.payload.userID,
        token: action.payload.token,
        verified: action.payload.verified,
        loggedIN: action.payload.loggedIN,
        userData: action.payload.userData,
      };
    case 'REMOVELOCALSTORAGE':
      useLocalStorage('ONBOARD', 'REMOVE');
      useLocalStorage('USERID', 'REMOVE');
      useLocalStorage('USERTOKEN', 'REMOVE');
      useLocalStorage('VERIFIED', 'REMOVE');
      useLocalStorage('LOGGEDIN', 'REMOVE');
      return {
        onboardingDone: false,
        userID: '',
        token: '',
        verified: false,
        loggedIN: false,
        userData: {},
      };
    case 'SETTRACING':
      return {
        ...state,
        tracingData: action.payload,
      };
    default:
      return state;
  }
};
