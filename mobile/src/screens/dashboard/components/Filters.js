import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Fonts} from '_styles';

const Filters = props => {
  const {setFilter} = props;
  const [selected, setSelected] = useState('Today');
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          setSelected('Today');
          setFilter('Today');
        }}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              selected === 'Today' ? Colors.LGREEN : Colors.PRIMARY,
          },
        ]}>
        <Text
          style={[
            Fonts.H5,
            {color: selected === 'Today' ? Colors.PRIMARY : Colors.FONTS},
          ]}>
          Today
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelected('All');
          setFilter('All');
        }}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              selected === 'All' ? Colors.LGREEN : Colors.PRIMARY,
          },
        ]}>
        <Text
          style={[
            Fonts.H5,
            {color: selected === 'All' ? Colors.PRIMARY : Colors.FONTS},
          ]}>
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelected('Date');
          setFilter('Date');
        }}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              selected === 'Date' ? Colors.LGREEN : Colors.PRIMARY,
          },
        ]}>
        <Text
          style={[
            Fonts.H5,
            {color: selected === 'Date' ? Colors.PRIMARY : Colors.FONTS},
          ]}>
          Date
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelected('Status');
          setFilter('Status');
        }}
        style={[
          styles.filterBtn,
          {
            backgroundColor:
              selected === 'Status' ? Colors.LGREEN : Colors.PRIMARY,
          },
        ]}>
        <Text
          style={[
            Fonts.H5,
            {color: selected === 'Status' ? Colors.PRIMARY : Colors.FONTS},
          ]}>
          Status
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {flexDirection: 'row', marginTop: 15},
  filterBtn: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
});

export default Filters;
