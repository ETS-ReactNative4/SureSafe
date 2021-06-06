import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts, Padding} from '../../styles';
import {VisitsCard, Header} from '../../components';
import Trace from './components/Trace';

export default Visits = ({navigation}) => {
  const [tracing, setTracing] = useState(false);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER]}>
        <Header navigation={navigation} title="Visits" info={false} />
        <View style={{}}></View>
      </View>

      <View style={{flex: 1, backgroundColor: Colors.PRIMARY}}>
        <ScrollView
          contentContainerStyle={{paddingTop: 15}}
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <VisitsCard />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: Colors.PRIMARY,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  info: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
