import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import {Colors, Fonts, Padding} from '_styles';
import {ScanCard, Header} from '_components';
import Trace from './components/Trace';

const Tracing = props => {
  const {navigation, tracingData} = props;
  const [tracing, setTracing] = useState(false);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <Header navigation={navigation} title="Geo Tracing" />
        <Trace setStatus={setTracing} />
      </View>

      <View style={{flex: 1.2, backgroundColor: Colors.PRIMARY}}>
        <View
          style={{
            width: '100%',
            paddingVertical: 15,
            backgroundColor: tracing ? Colors.LGREEN : Colors.LRED,
            alignItems: 'center',
          }}>
          <Text style={[Fonts.H4, {color: Colors.PRIMARY}]}>
            Geo Tracing is {tracing ? 'ON' : 'OFF'}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{paddingTop: 15}}
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          {tracingData?.map((item, index) => {
            return <ScanCard key={index} item={item} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    tracingData: state.tracingData,
  };
};

export default connect(mapStatetoProps)(Tracing);
