import React from 'react';
import {View, Text} from 'react-native';

import {Fonts, Padding, Colors, Defaults} from '../../styles';
import {Input, PasswordInput, Button} from '../../components';
import {Title} from './components';

export default Login = ({navigation}) => {
  // States
  const [state, setState] = React.useState({
    password: true,
  });

  return (
    <View style={Defaults.Creation.backgorund}>
      <Title
        title="SureSafe"
        info="Protect yourself, your family , and your community to prevent COVID-19
        from spreding."
      />
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>Login</Text>
        <Input placeholder="Email" />
        <PasswordInput
          onPress={() =>
            setState(prevState => {
              return {...prevState, password: !state.password};
            })
          }
          placeholder="Password"
          state={state.password}
        />
        <Button
          text="Log in"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
        />
        <Button
          text="Forgot password?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.FONTS}
        />
        <Button
          onPress={() => navigation.navigate('Create')}
          text="Create account?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.GREY}
        />
      </View>
    </View>
  );
};
