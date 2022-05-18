import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import schedule from 'node-schedule';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';

import {Colors} from '_styles';
import {TracingAPI, UpdateTracingAPI, RemoveTracingAPI} from '../api';
import {usePermision} from '_hooks';
import {setTracingData} from '_redux';

const Trace = props => {
  const {setStatus, userID, dispatch} = props;
  const [tracing, setTracing] = useState(false);
  const [geolocation, setGeolocation] = useState({
    latitude: '',
    longitude: '',
    accuracy: 2,
  });
  const [ready, setReady] = useState(true);
  const [request, setRequest] = useState(0);

  const circle1 = useState(new Animated.Value(290))[0];
  const [stat, setStat] = useState(false);

  const getLocationUpdates = async () => {
    const hasPermission = await usePermision();

    if (ready) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude, accuracy} = position.coords;
          setGeolocation({
            latitude: `${latitude}`.substring(0, 6),
            longitude: `${longitude}`.substring(0, 7),
            accuracy: accuracy,
          });
          setReady(false);
          console.log('position.coords', position.coords);
        },
        error => {
          setGeolocation({});
          console.log('error', error);
        },
        {
          enableHighAccuracy: true,
          accuracy: {
            android: 'high',
            ios: 'nearestTenMeters',
          },
          maximumAge: 100,
          timeout: 1000,
          distanceFilter: 1,
        },
      );
    }
  };

  const onTracing = () => {
    if (!tracing) {
      schedule.scheduleJob('TRACINGON', '*/2 * * * * *', async () => {
        getLocationUpdates();
      });
    } else {
      let current_job = schedule.scheduledJobs.TRACINGON;
      current_job.cancel();
    }
    setStatus(!tracing);
    setTracing(!tracing);
  };

  useEffect(() => {
    if (tracing) {
      Animated.timing(circle1, {
        toValue: stat ? 320 : 290,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      setStat(!stat);
      setRequest(request + 1);
      const promise = async () => {
        await TracingAPI(userID, geolocation);
        const updateTracing = await UpdateTracingAPI(userID);
        dispatch(setTracingData(updateTracing));
        setReady(true);
      };
      promise();
    } else {
      const promise = async () => {
        await RemoveTracingAPI(userID);
        const updateTracing = await UpdateTracingAPI(userID);
        dispatch(setTracingData(updateTracing));
      };
      promise();
    }
  }, [geolocation, tracing]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Animated.View
        style={[styles.circle1, {height: circle1, width: circle1}]}>
        <View style={[styles.circle2]}>
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
                  onPress={onTracing}
                  style={[
                    styles.tracingBtn,
                    {
                      backgroundColor: tracing ? Colors.LGREEN : Colors.LRED,
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
      </Animated.View>
    </View>
  );
};

const mapStatetoProps = state => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStatetoProps)(Trace);

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle5: {
    height: 100,
    width: 100,
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
