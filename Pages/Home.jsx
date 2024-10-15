import React from 'react';
import {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import CustomCalender from '../Components/CustomCalender';
import NewTask from '../Components/NewTask';
import TaskCard from '../Components/TaskCard';
import ViewTask from '../Components/ViewTask';
import Loading_modal from '../Components/Loading_modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const homeBackground = require('../Assets/images/HeaderView.png');
const calenderIcon = require('../Assets/images/calender.png');
const addTaskIcon = require('../Assets/images/addTask.png');
const pendingIcon = require('../Assets/images/pending.png');
const logoutIcon = require('../Assets/images/logout.png');

const demoTasks = [
  {
    id: 1,
    title: 'Go to the gym',
    description: 'Do 30 minutes of cardio and 30 minutes of weight lifting',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Buy milk, eggs, bread, and fruits',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 3,
    title: 'Finish project report',
    description: 'Complete the final section of the project report and review',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 4,
    title: 'Call mom',
    description: 'Catch up with mom over the phone',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 5,
    title: 'Read a book',
    description: 'Read two chapters of "Atomic Habits"',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 6,
    title: 'Clean the kitchen',
    description: 'Do the dishes and wipe down counters',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 7,
    title: 'Practice coding',
    description: 'Solve 5 problems on LeetCode',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 8,
    title:
      "Prepare for tomorrow's meeting with the project team and ensure all documents are ready",
    description:
      "Gather all relevant documents, including last month's reports, project updates, and data analyses. Prepare a summary for each document to present in tomorrow's meeting. Verify that the meeting agenda has been communicated to all participants and confirm attendance.",
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 9,
    title:
      'Plan the weekend road trip itinerary with friends, including sightseeing, food stops, and activities',
    description:
      'Research interesting spots to visit on the way, including parks, beaches, and landmarks. Find popular local restaurants with good reviews for each day of the trip. Plan a list of activities for each stop, including hikes, museums, and local tours. Check weather forecasts and note any potential road closures.',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 10,
    title: 'Organize workspace',
    description: 'Sort through documents, tidy up desk, and organize cables',
    date: '2024-11-10',
    status: 0,
  },
];

function Home({navigation, name}) {
  const [userName, setUserName] = useState('User');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalender, setShowCalender] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskModal, setSelectedTaskModal] = useState(!false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setUserName(name);
    getTodayDate();
    getUserTasks();

    AsyncStorage.getItem('token').then(value => {
      console.log('Token-------', value);
    });
  }, []);

  useEffect(() => {
    getUserTasks();
  }, [selectedDate]);
  //bearer token
  const getUserTasks = async () => {
    await axios
      .get(`/task/getTasks/${selectedDate}`)
      .then(response => {
        //console.log(response.data.tasks);
        setTasks(response.data.tasks);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const limitName = name => {
    const nameStr = String(name);
    if (nameStr.length > 8) {
      return nameStr.substring(0, 8) + '..';
    }
    return nameStr;
  };

  const getDay = date => {
    //date format: '2024-11-10'
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date(date);
    const dayName = days[d.getDay()];
    return dayName;
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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedTaskModal(true);
  };

  const logout = async () => {
    try {
      const response = await axios.post('/logout');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
      await AsyncStorage.removeItem('token');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={homeBackground} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>
                Hello {limitName(userName)}{' '}
                <Text style={styles.waveHand}>👋</Text>
              </Text>
            </View>
            <TouchableOpacity
              
              onPress={() => {
                logout();
              }}>
              <Image source={logoutIcon} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.dayText}>{getDay(selectedDate)}</Text>
              <Text style={styles.dateText}>{selectedDate}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => setShowNewTask(!showNewTask)}>
                <Image source={addTaskIcon} style={styles.addTaskIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
                <Image source={calenderIcon} style={styles.calenderIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showCalender && (
          <View style={styles.calendarContainer}>
            <CustomCalender
              selectedDate={selectedDate}
              handleDateSelection={handleDateSelection}
              setShowCalender={setShowCalender}
              showCalender={showCalender}
            />
          </View>
        )}

        <NewTask
          date={selectedDate}
          NewTask={showNewTask}
          setShowNewTask={setShowNewTask}
          getUserTasks={getUserTasks}
        />

        {selectedTask != null && (
          <View style={styles.modal}>
            <ViewTask
              date={selectedDate}
              task={selectedTask}
              setSelectedTaskModal={setSelectedTaskModal}
              selectedTaskModal={selectedTaskModal}
              getUserTasks={getUserTasks}
            />
          </View>
        )}

        <ScrollView style={styles.scrollView}>
          <View style={styles.cardContainer}>
            {tasks.map(task => (
              <TouchableOpacity onPress={() => handleTaskClick(task)}>
                <TaskCard
                  title={task.title}
                  status={task.completed}
                  key={task.id}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    padding: 20,
  },
  nameContainer: {
    marginBottom: 10,
  },
  nameText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  waveHand: {
    // You can add specific styling for the wave hand emoji if needed
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'DancingScriptRegular',
  },
  dateText: {
    color: 'white',
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  addTaskIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
    marginTop: 5,
  },
  calenderIcon: {
    width: 38,
    height: 38,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  cardContainer: {
    padding: 20,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 15,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    marginTop: 10,
    border: '1px solid white',
  },
});

export default Home;
