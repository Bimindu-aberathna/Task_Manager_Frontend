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

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Home />
    </SafeAreaView>
  );
}

export default App;
