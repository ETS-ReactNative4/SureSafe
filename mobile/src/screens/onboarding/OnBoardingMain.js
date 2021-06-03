import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';

import {Main} from './Style';
import {Images, Colors} from '../../styles';
import {Button} from '../../components';
import {setLocalStorage} from '../../redux/actions';
import getKeys from './utils/getKeys';

const OnBoardingMain = props => {
  const {navigation, loggedIN, dispatch} = props;
  useEffect(() => {
    const GET = async () => {
      const DATA = await getKeys();
      dispatch(setLocalStorage(DATA));
      if (loggedIN == 'true') {
        navigation.reset({
          index: 0,
          routes: [{name: 'TabNavigation'}],
        });
      }
    };
    GET();
  }, [loggedIN]);

  return (
    <View style={Main.container}>
      <Image
        style={Main.Image}
        source={Images.onboardingmain}
        resizeMode="cover"
      />
      <Text style={Main.Title}>Let's help each other to prevent COVID-19</Text>
      <Text style={Main.Info}>
        Protect yourself, your family , and your community to prevent COVID-19
        from spreding.
      </Text>

      <Button
        onPress={() => navigation.navigate('OnBoarding')}
        text="Get started"
        backgroundColor={Colors.LGREEN}
        color={Colors.PRIMARY}
      />
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    loggedIN: state.loggedIN,
  };
};

export default connect(mapStatetoProps)(OnBoardingMain);
