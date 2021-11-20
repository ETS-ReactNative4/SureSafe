import {RFPercentage} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let updateCardW = 0;
let updateCardH = 0;
let mainButtonH = 0;
let menuButtonH = 0;
let scanCardH = 0;
if (width >= 411) {
  updateCardH = 250;
  updateCardW = 320;
  mainButtonH = 81;
  menuButtonH = 80;
  scanCardH = 120;
} else if (width >= 390) {
  updateCardH = 220;
  updateCardW = 300;
  mainButtonH = 80;
  menuButtonH = 70;
  scanCardH = 110;
} else if (width >= 360) {
  updateCardH = 210;
  updateCardW = 280;
  mainButtonH = 75;
  menuButtonH = 70;
  scanCardH = 105;
} else {
  updateCardH = 200;
  updateCardW = 290;
  mainButtonH = 70;
  menuButtonH = 60;
  scanCardH = 100;
}

export const Dashboard = {
  updateCardH: updateCardH,
  updateCardW: updateCardW,
  mainButtonH: mainButtonH,
  menuButtonH: menuButtonH,
};

export const Components = {
  scanCardH: scanCardH,
};

export const MainButton = {
  height: 65,
  width: '90%',
};

export const MainInput = {
  height: 60,
  width: '100%',
};
