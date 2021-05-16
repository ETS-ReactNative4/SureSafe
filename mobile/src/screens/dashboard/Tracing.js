import React, {useState, useEffect} from 'react';
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

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={styles.circle1}>
            <View style={styles.circle2}>
              <View style={styles.circle3}>
                <View style={styles.circle4}>
                  <View
                    style={[
                      styles.circle5,
                      {
                        backgroundColor: tracing
                          ? Colors.LGREEN + 'B3'
                          : Colors.LRED + 'B3',
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => setTracing(!tracing)}
                      style={[
                        styles.tracingBtn,
                        {
                          backgroundColor: tracing
                            ? Colors.LGREEN
                            : Colors.LRED,
                        },
                      ]}>
                      <FontAwesome5
                        name={'street-view'}
                        size={40}
                        color={Colors.PRIMARY}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
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
  circle1: {
    height: 300,
    width: 300,
    backgroundColor: Colors.PRIMARY + '4D',
    borderRadius: 300,
    padding: 30,
  },
  circle2: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.PRIMARY + 59,
    borderRadius: 300,
    padding: 30,
  },
  circle3: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.PRIMARY + 66,
    borderRadius: 300,
    padding: 25,
  },
  circle4: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.PRIMARY + 73,
    borderRadius: 300,
    padding: 20,
  },
  circle5: {
    height: '100%',
    width: '100%',
    borderRadius: 300,
    padding: 5,
  },
  tracingBtn: {
    height: '100%',
    width: '100%',
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
