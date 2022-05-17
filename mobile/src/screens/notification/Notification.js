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
    const {clicked, permission, title, date, type} = data?.item;
    const newDate = new Date(date);
    // const {status} = data.item.data;
    if (type === 'Establishment') {
      return (
        <NotificationCard
          isSelected={clicked}
          permission={permission}
          title={title}
          info={
            'A Establishment you recently visited have been exposed to an infected person'
          }
          time={newDate.toString().substr(0, 15)}
          data={data.item.data}
        />
      );
    } else {
      return (
        <NotificationCard
          isSelected={clicked}
          permission={permission}
          title={title}
          info={
            title === 'Potential'
              ? 'You have been potentialy exposed to a exposed SureSafe user.'
              : 'You have been exposed to a infected SureSafe user.'
          }
          time={newDate.toString().substr(0, 15)}
          data={data.item.data}
        />
      );
    }
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
        {data?.data?.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[Fonts.H4, {color: Colors.MAIN, marginBottom: 80}]}>
              No Notifications yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={renderNotifications}
            keyExtractor={item => item._id}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
          />
        )}
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
