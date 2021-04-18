import * as Colors from './Colors';
import * as Margin from './Margin';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

let size = 0;
if (Dimensions.get('window').width < 414) {
  size = 3;
}

export const TITLE = {
  fontFamily: 'Gilroy-Black',
  fontSize: RFPercentage(5.5) - size,
  color: Colors.FONTS,
  marginBottom: Margin.TEXT - 2,
};

export const BODY = {
  fontFamily: 'Gilroy-Light',
  fontSize: RFPercentage(2.5) - size,
  color: Colors.FONTS,
};

export const LIGHT = {
  fontFamily: 'Gilroy-Light',
  fontSize: RFPercentage(2) - size,
  color: Colors.FONTS,
};

export const H1 = {
  fontFamily: 'Gilroy-Black',
  fontSize: RFPercentage(4.3) - size,
  color: Colors.FONTS,
};

export const H2 = {
  fontFamily: 'Gilroy-ExtraBold',
  fontSize: RFPercentage(4.4) - size,
  color: Colors.FONTS,
};

export const H3 = {
  fontFamily: 'Gilroy-ExtraBold',
  fontSize: RFPercentage(3.7) - size,
  color: Colors.FONTS,
};

export const H4 = {
  fontFamily: 'Gilroy-ExtraBold',
  fontSize: RFPercentage(2.9) - size,
  color: Colors.FONTS,
};

export const H5 = {
  fontFamily: 'Gilroy-Bold',
  fontSize: RFPercentage(2.5) - size,
  color: Colors.FONTS,
};

export const H6 = {
  fontFamily: 'Gilroy-Bold',
  fontSize: RFPercentage(2) - size,
  color: Colors.FONTS,
};
