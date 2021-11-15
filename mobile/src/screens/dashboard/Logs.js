import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Padding} from '_styles';
import {ScanCard, Header} from '_components';
import {LogsAPI} from './api';
import {InfoCard, Filters} from './components';

const Logs = props => {
  const {navigation, userID} = props;
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await LogsAPI(userID, setData);
    setRefreshing(false);
  }, [userID]);

  useEffect(() => {
    const getData = async () => {
      await LogsAPI(userID, setData);
    };
    getData();
  }, [userID]);

  return (
    <View style={[styles.visits]}>
      <View style={[Padding.CONTAINER]}>
        <Header navigation={navigation} title="Logs" info={false} />
        <InfoCard
          name={data.data?.name ? data.data?.name : 'Your Name'}
          address={data.data?.address ? data.data?.address : 'Your Address'}
          title="Total Logs"
          total={data.data?.total ? data.data?.total : '0'}
        />
        {/* <Filters /> */}
      </View>
      <View style={styles.list}>
        <FlatList
          data={data?.data?.Logs}
          renderItem={ScanCard}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.containerScroll}
          style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  visits: {flex: 1, backgroundColor: Colors.MAIN},
  list: {flex: 1, backgroundColor: Colors.PRIMARY},
  scroll: {
    flex: 1,
    paddingHorizontal: 10,
  },
  containerScroll: {paddingVertical: 15},
});

const mapStatetoProps = state => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Logs);
