import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, FlatList, Platform} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Fonts, Margin, Padding} from '_styles';
import {Button} from '_components';
import {NotificationCard} from './components';
import {NotificationAPI} from './api';

const Notification = props => {
  const {navigation, userData} = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      await NotificationAPI(userData, setData);
    };
    getData();
  }, [userData, navigation]);

  const renderNotifications = data => {
    const {clicked, permission, title, date} = data?.item;
    const newDate = new Date(date);
    const {status} = data.item.data;
    return (
      <NotificationCard
        isSelected={clicked}
        permission={permission}
        title={title}
        info={`to someone ${status}.`}
        time={newDate.toString().substr(0, 15)}
        data={data.item.data}
      />
    );
  };

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Text style={[Fonts.H2, {color: Colors.PRIMARY, marginBottom: 'auto'}]}>
          Notification
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor: Colors.PRIMARY,
            height: Platform.OS == 'ios' ? '85%' : '90%',
            paddingHorizontal: Padding.CONTAINER.paddingHorizontal,
            paddingVertical: 10,
          },
        ]}>
        <FlatList
          data={data?.data}
          renderItem={renderNotifications}
          keyExtractor={item => item._id}
          // style={styles.scroll}
        />
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStatetoProps)(Notification);
