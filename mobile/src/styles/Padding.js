import {Platform} from 'react-native';

import {RFPercentage} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const CONTAINER = {
  paddingTop: Platform.OS === 'ios' ? 60 : 10,
  paddingBottom: Platform.OS === 'ios' ? 20 : 20,
  paddingHorizontal: 20,
};

export const CREATION = {
  paddingHorizontal: 40,
  paddingTop: 40,
  paddingBottom: 40,
};
