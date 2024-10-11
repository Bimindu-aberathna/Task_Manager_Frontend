import React from 'react';
import {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const homeBackground = require('../Assets/images/HeaderView.png'); 
function Home() {
  const [userName, setUserName] = useState('Umayanga');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    const date = new Date();
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <ImageBackground source={homeBackground} style={{flex: 1}}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          Hello {userName} <Text style={styles.waveHand}>👋</Text>
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.dayText}>{'Friday'}</Text>
          <Text style={styles.dateText}>{'10-11-2024'}</Text>
        </View>
        <View>
          {/* <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
          /> */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  nameText: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  waveHand: {
    // transform: [{ rotate: '180deg' }],
    rotation: '180deg',
  },
  dayText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: Platform.select({
      ios: 'Snell Roundhand', // iOS cursive alternative
      android: 'sans-serif-light', // Android light serif as a fallback
    }),
  },
  dateText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
  },
});

export default Home;
