import React from 'react';
import {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import CustomCalender from '../Components/CustomCalender';
import NewTask from '../Components/NewTask';

const homeBackground = require('../Assets/images/HeaderView.png');
const calenderIcon = require('../Assets/images/calender.png');
const addTaskIcon = require('../Assets/images/addTask.png');

function Home() {
  const [userName, setUserName] = useState('Umayanga');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalender, setShowCalender] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);

  useEffect(() => {
    getTodayDate();
  }, []);

  const getDate = () => {
    const date = new Date();
    setSelectedDate(date);
    console.log(date);
  };

  const openCalender = () => {
    setShowCalender(!showCalender);
  };

  const closeCalender = () => {
    setShowCalender(false);
  };

  const handleDateSelection = date => {
    setSelectedDate(date);
    console.log(date);
    closeCalender();
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const processedDate = `${year}-${month}-${day}`;
    setSelectedDate(processedDate);
  }

  return (
    <ImageBackground source={homeBackground} style={{flex: 1}}>
      <TouchableOpacity onPress={closeCalender}>
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
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <TouchableOpacity onPress={() => setShowNewTask(!showNewTask)}>
                <Image source={addTaskIcon} style={styles.addTaskIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
                <Image source={calenderIcon} style={styles.calenderIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.calendarContainer,
            {display: showCalender ? 'flex' : 'none'},
          ]}>
          <CustomCalender
            selectedDate={selectedDate}
            handleDateSelection={handleDateSelection}
            setShowCalender={setShowCalender}
          />
        </View>
        <View>
          <NewTask
            date={selectedDate}
            NewTask={showNewTask}
            setShowNewTask={setShowNewTask}
          />
        </View>
      </TouchableOpacity>
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
  calendarContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  calenderIcon: {
    marginTop: 15,
    width: 38,
    height: 38,
    marginRight: 20,
  },
  addTaskIcon: {
    marginTop: 20,
    width: 30,
    height: 30,
    marginRight: 20,
  },
});

export default Home;
