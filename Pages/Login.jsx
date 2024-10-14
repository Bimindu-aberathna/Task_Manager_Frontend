import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Image,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

const loginBackground = require('../Assets/images/Header.png'); // Adjust the path to your image
const logo = require('../Assets/images/logo.png'); // Adjust the path to your image

function AnimatedErrorMessage({ message, visible }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible && opacity._value === 0) return null;

  return (
    <Animated.View style={[styles.errorContainer, { opacity }]}>
      <Text style={styles.errorText}>{message}</Text>
    </Animated.View>
  );
}

function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!userName || !password) {
      setErrorMessage('Please enter both email and password.');
    } else {
      setErrorMessage('');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={loginBackground}
        style={{
          position: 'absolute',
          width: '100%',
          resizeMode: 'contain',
          top: 0,
          left: 0,
          marginTop: -15,
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.loginBox}>
          <Image source={logo} style={{ width: 100, height: 100, alignSelf: 'center',marginTop: -50 }} />
          <AnimatedErrorMessage message={errorMessage} visible={!!errorMessage} />
          
          <View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          
          <Text style={styles.label}>Password:</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={{flex: 1,color: 'black'}}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPWDText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <Text style={{textAlign:'center',marginTop:17,marginRight:10,color:'gray'}}>Don't have an account? <Text style={{color:'blue'}} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    width: 300,
    paddingBottom: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: 'black',
  },
  inputBox: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  showPWDText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
});

export default Login;