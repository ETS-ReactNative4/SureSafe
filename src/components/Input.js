import React from 'react';
import {TextInput} from 'react-native';
import {Defaults} from '../styles';

export default Input = props => {
  return <TextInput placeholder={props.placeholder} style={Defaults.Input} />;
};
