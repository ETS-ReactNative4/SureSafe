import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Fonts, Padding, Colors, Margin, Defaults} from '../../styles';
import {Input, PasswordInput, Button} from '../../components';
import {Title, CheckBox} from './components';

export default Create = ({navigation}) => {
  // States
  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState({
    password: true,
    confirm: true,
  });

  return (
    <View style={Defaults.Creation.backgorund}>
      <Title
        title="Create Now!"
        info="Create your account now. Let's help each other to end this pandemic!"
      />
      <View style={[Padding.CREATION, Defaults.Creation.whiteBox]}>
        <Text style={[Fonts.H3, Defaults.Creation.heading]}>
          Create Account
        </Text>
        <Input placeholder="Name" />
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
        <PasswordInput
          onPress={() =>
            setState(prevState => {
              return {...prevState, confirm: !state.confirm};
            })
          }
          placeholder="Confirm Password"
          state={state.confirm}
        />
        <CheckBox onPress={() => setChecked(!checked)} checked={checked} />
        <Button
          text="Create Account"
          backgroundColor={Colors.LGREEN}
          color={Colors.PRIMARY}
          onPress={() => navigation.navigate('Address')}
        />
        <Button
          text="Already have an account?"
          backgroundColor={Colors.PRIMARY}
          color={Colors.GREY}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};
