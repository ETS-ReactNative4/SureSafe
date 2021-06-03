import {useLocalStorage} from '../../../hooks';
import {userData} from '../../../api'

export default getKeys = async () => {
  const onboardingDone = await useLocalStorage('ONBOARD', 'GET');
  const userID = await useLocalStorage('USERID', 'GET');
  const token = await useLocalStorage('TOKEN', 'GET');
  const verified = await useLocalStorage('VERIFIED', 'GET');
  const loggedIN = await useLocalStorage('LOGGEDIN', 'GET');
  const userDatas = await userData(userID, token);
  const data = {
    onboardingDone: onboardingDone,
    userID: userID,
    token: token,
    verified: verified,
    loggedIN: loggedIN,
    user
  };
  return data;
};
