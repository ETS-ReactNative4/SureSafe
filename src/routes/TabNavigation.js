import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from '../styles';

import Dashboard from '../screens/dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tabNavigator,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name={'home'}
              size={22}
              style={{
                color: focused ? Colors.PRIMARY : Colors.FONTS,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabNavigator: {
    height: 85,
    position: 'absolute',
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: Colors.MAIN,
    borderTopColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    shadowColor: Colors.FONTS,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  mapsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TabNavigation;
