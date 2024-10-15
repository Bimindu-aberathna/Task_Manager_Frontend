import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import SplashScreen from './Pages/SplashScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = 'http://172.16.26.69:8000/api/';
axios.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    // console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

function App(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          options={{title: 'Login', headerShown: false}}>
          {props => <Login {...props} setName={setName} />}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: 'Signup', headerShown: false}}
        />
        <Stack.Screen name="Home" options={{title: 'Home', headerShown: false}}>
          {props => <Home {...props} name={name} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
