import React, {useState, useEffect} from 'react';
import {View, Image, Animated, Text, Touchable, TouchableOpacity} from 'react-native';

const backgroundImage = require('../Assets/images/Header.png');
const logo = require('../Assets/images/logo.png');
const welcome = require('../Assets/images/WELCOME.png');

function SplashScreen({navigation}) {
  const [welcomeOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    fadeIn();
    loadLogin();
  }, []);

  const loadLogin = () => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1800);
  };

  const fadeIn = () => {
    Animated.timing(welcomeOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={backgroundImage}
        style={{
          width: '100%',
          resizeMode: 'contain',
          top: 0,
          marginTop: -15,
          position: 'absolute',
        }}
      />
      <Image
        source={logo}
        style={{
          width: 230,
          height: 230,
          alignSelf: 'center',
          shadowColor: '#FFFFFF',
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
          marginTop: 50,
        }}
      />
      <Animated.View style={{opacity: welcomeOpacity}}>
        <Image
          source={welcome}
          style={{
            width: 250,
            alignSelf: 'center',
            marginTop: 300,
            shadowColor: '#FFFFFF',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 5,
          }}
        />
      </Animated.View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            fontSize: 20,
            color: 'blue',
            textAlign: 'right',
            marginTop: 50,
            marginLeft: 'auto',
          }}>
          {'Get Started'}
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashScreen;
