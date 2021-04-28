import * as Colors from './Colors';
import * as Fonts from './Fonts';
import * as Margin from './Margin';
import * as Sizes from './Sizes';

export const Button = [
  {
    height: Sizes.MainButton.height,
    width: Sizes.MainButton.width,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LGREEN,
  },
  [
    Fonts.H5,
    {
      textAlign: 'center',
      color: Colors.PRIMARY,
    },
  ],
];

export const Input = [
  {
    width: Sizes.MainInput.width,
    height: Sizes.MainInput.height,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: Margin.INPUT,
  },
  Fonts.BODY,
];

export const Creation = {
  backgorund: {backgroundColor: Colors.MAIN, flex: 1},
  whiteBox: {
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  heading: {marginBottom: Margin.INPUT, width: '100%'},
};
