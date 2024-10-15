import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  CheckBox,
  Image,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import axios from 'axios';

const loginBackground = require('../Assets/images/Header.png');
const logo = require('../Assets/images/logo.png');
const checked = require('../Assets/images/checkedbox.png');
const unchecked = require('../Assets/images/uncheckedbox.png');

function AnimatedErrorMessage({message, visible}) {
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
    <Animated.View style={[styles.errorContainer, {opacity}]}>
      <Text style={styles.errorText}>{message}</Text>
    </Animated.View>
  );
}

function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [next, setNext] = useState(false);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateName = name => {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
  };

  const handleNext = () => {
    if (!email || !name) {
      setErrorMessage('Please enter both email and name.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
    } else if (!validateName(name)) {
      setErrorMessage('Please enter a valid name.');
    } else {
      setErrorMessage('');
      setNext(true);
    }
  };
  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage('Please enter both password and confirm password.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
      try {
        const response = await axios.post(
          'http://172.16.26.69:8000/api/register',
          {
            email: email,
            name: name,
            password: password,
          },
        );
        console.log(response.data);
        if (response.data.error) {
          setErrorMessage('Error Occurred');
        } else {
          setErrorMessage('');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('An error occurred. Please try again later.');
      }
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
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        {!next && (
          <View style={styles.loginBox}>
            <Image
              source={logo}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: -50,
              }}
            />
            <AnimatedErrorMessage
              message={errorMessage}
              visible={!!errorMessage}
            />

            <View>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text style={styles.label}>Your Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {next && (
          <View style={styles.loginBox}>
            <Image
              source={logo}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: -50,
              }}
            />
            <AnimatedErrorMessage
              message={errorMessage}
              visible={!!errorMessage}
            />

            <View>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Confirm Password:</Text>
              <TextInput
                placeholder="Confirm your password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
              />
            </View>

            <View style={styles.CheckBox}>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={showPassword ? checked : unchecked}
                  style={{width: 16, height: 16, marginLeft: 5}}
                />
                <Text style={styles.showPWDText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
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
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
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
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
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
  CheckBox: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  showPWDText: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default Signup;
