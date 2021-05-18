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
import {ScanCard} from '../../components';
import Trace from './components/Trace';

export default Tracing = ({navigation}) => {
  const [tracing, setTracing] = useState(false);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.MAIN}]}>
      <View style={[Padding.CONTAINER, {flex: 1}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <FontAwesome5 name={'angle-left'} size={30} color={Colors.LGREEN} />
          </TouchableOpacity>
          <Text style={[Fonts.H3, styles.header]}>Geo Tracing</Text>
          <TouchableOpacity style={styles.info}>
            <FontAwesome5 name={'info'} size={20} color={Colors.LGREEN} />
          </TouchableOpacity>
        </View>
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
          <ScanCard />
          <ScanCard />
          <ScanCard />
          <ScanCard />
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
