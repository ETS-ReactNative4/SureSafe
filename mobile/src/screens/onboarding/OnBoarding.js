import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import {Main} from './Style';
import {Images, Colors, Defaults} from '../../styles';
import {Button} from '../../components';

const data = [
  {
    title: 'Geo Tracing',
    info:
      'Use Geo Tracing to anonymously log when you are near other app users.',
    img: Images.onboarding1,
  },
  {
    title: 'Record Visit',
    info: 'Track your steps by scanning QR codes and checking into locations',
    img: Images.onboarding2,
  },
  {
    title: 'Share your Data',
    info:
      "All data will be collected in your phone you're the one will decide if you share your collected data or not.",
    img: Images.onboarding3,
  },
  {
    title: 'Exposed Alerts',
    info: 'Recieve alerts if you might have been exposed to the virus.',
    img: Images.onboarding4,
  },
];

const width = Dimensions.get('window').width;

export default OnBoarding = ({navigation}) => {
  const scrollX = new Animated.Value(0);

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {data.map((item, index) => {
          return (
            <View key={index} style={[Main.container, {width: width}]}>
              <Image
                style={[Main.Image, {height: 350, marginTop: 50}]}
                source={item.img}
                resizeMode="cover"
              />
              <Text style={Main.Title}>{item.title}</Text>
              <Text style={Main.Info}>{item.info}</Text>
              <Button
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Creation'}],
                  })
                }
                text={index == 3 ? 'Create Account' : 'Skip'}
                backgroundColor={index == 3 ? Colors.LGREEN : Colors.MAIN}
                color={Colors.PRIMARY}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderDot() {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={Main.Dot}>
        {data.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 17, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[
                Main.dot,
                {
                  height: dotSize,
                  width: dotSize,
                },
              ]}></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderContent()}
      {renderDot()}
    </View>
  );
};
