import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Padding} from '_styles';
import {VisitsCard, Header} from '_components';
import {VisitsApi} from './api';
import {InfoCard, Filters} from './components';

const Visits = props => {
  const {navigation, userID} = props;
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('Today');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await VisitsApi(userID, setData, filter);
    setRefreshing(false);
  }, [userID, filter]);

  useEffect(() => {
    const getData = async () => {
      await VisitsApi(userID, setData, filter);
    };
    getData();
  }, [userID, filter]);

  return (
    <View style={[styles.visits]}>
      <View style={[Padding.CONTAINER]}>
        <Header navigation={navigation} title="Visits" info={false} />
        <InfoCard
          name={data.data?.name ? data.data?.name : 'Your Name'}
          address={data.data?.address ? data.data?.address : 'Your Address'}
          title="Total Visits"
          total={data.data?.total ? data.data?.total : '0'}
        />
        <Filters setFilter={setFilter} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={data?.data?.Visits}
          renderItem={VisitsCard}
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

export default connect(mapStatetoProps)(Visits);
