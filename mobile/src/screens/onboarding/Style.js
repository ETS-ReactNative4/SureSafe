import {Fonts, Colors, Padding, Margin} from '_styles';

const Main = {
  container: [
    Padding.CONTAINER,
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.MAIN,
    },
  ],
  Image: {
    width: '100%',
    marginBottom: 25,
    height: 200,
    marginTop: 'auto',
  },
  Title: [
    Fonts.H3,
    {
      textAlign: 'center',
      color: Colors.PRIMARY,
      marginBottom: Margin.TEXT,
    },
  ],
  Info: [
    Fonts.BODY,
    {
      textAlign: 'center',
      color: Colors.PRIMARY,
      lineHeight: 20,
      paddingHorizontal: 10,
      marginBottom: 'auto',
    },
  ],
  Dot: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '25%',
    flexDirection: 'row',
    height: 20,
  },
  dot: {
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: Colors.PRIMARY,
  },
};

export {Main};
