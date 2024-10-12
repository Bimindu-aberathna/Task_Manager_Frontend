/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Signup />
    </SafeAreaView>
  );
}

export default App;
