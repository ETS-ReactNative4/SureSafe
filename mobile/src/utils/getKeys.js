import {useLocalStorage} from '_hooks';
import {userData} from '_services';

export const getKeys = async () => {
  const onboardingDone = await useLocalStorage('ONBOARD', 'GET');
  const userID = await useLocalStorage('USERID', 'GET');
  const token = await useLocalStorage('USERTOKEN', 'GET');
  const verified = await useLocalStorage('VERIFIED', 'GET');
  const loggedIN = await useLocalStorage('LOGGEDIN', 'GET');
  const userDatas = await userData(userID, token);
  const data = {
    onboardingDone: onboardingDone,
    userID: userID,
    token: token,
    verified: verified,
    loggedIN: loggedIN,
    userData: userDatas.data,
  };
  return data;
};
