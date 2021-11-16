import React, {useEffect, useState} from 'react';
import {Text, View, Platform} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Fonts, Padding} from '_styles';
import {UserInfo, DataShare, Settings} from './components';
import {removeLocalStorage} from '_redux';
import {ProfileAPI} from './api';

const Profile = props => {
  const {navigation, state, dispatch} = props;
  const [data, setData] = useState({});
  const handleSignOut = () => {
    dispatch(removeLocalStorage());
    navigation.reset({
      index: 0,
      routes: [{name: 'Creation'}],
    });
  };
  console.log('data', data);

  useEffect(() => {
    const getData = async () => {
      await ProfileAPI(state, setData);
    };
    getData();
  }, [state, navigation]);

  console.log('state', state);
  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Profile
        </Text>
        <UserInfo data={data?.data} />
        <DataShare data={data?.data} />
      </View>

      <View
        style={[
          {
            paddingTop: 20,
            paddingBottom: 100,
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
            height: Platform.OS == 'ios' ? 'auto' : '55%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Settings color={Colors.MAIN} icon="user-cog" text="User Settings" />
        <Settings color={Colors.LYELLOW} icon="file-alt" text="Terms of Use" />
        <Settings color={Colors.LBLUE} icon="cog" text="Preferences" />
        <Settings
          onPress={() => handleSignOut()}
          color={Colors.LRED}
          icon="sign-out-alt"
          text="Sign Out"
        />
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    state: state,
  };
};

export default connect(mapStatetoProps)(Profile);
