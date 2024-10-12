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
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import CustomCalender from '../Components/CustomCalender';
import NewTask from '../Components/NewTask';
import TaskCard from '../Components/TaskCard';
import ViewTask from '../Components/ViewTask';

const homeBackground = require('../Assets/images/HeaderView.png');
const calenderIcon = require('../Assets/images/calender.png');
const addTaskIcon = require('../Assets/images/addTask.png');
const pendingIcon = require('../Assets/images/pending.png');

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
  {
    id: 11,
    title: 'Respond to emails',
    description: 'Reply to any outstanding emails from colleagues and clients',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 12,
    title: 'Update budget spreadsheet',
    description: 'Add recent expenses and review monthly savings goal',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 13,
    title: 'Take a walk outside',
    description: 'Enjoy a 20-minute walk around the neighborhood to relax',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 14,
    title: 'Make dinner plans',
    description: 'Plan and prep ingredients for dinner',
    date: '2024-11-10',
    status: 0,
  },
  {
    id: 15,
    title: 'Complete daily meditation',
    description: 'Practice meditation for at least 10 minutes',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 16,
    title: 'Complete daily meditation',
    description: 'Practice meditation for at least 10 minutes',
    date: '2024-11-10',
    status: 1,
  },
  {
    id: 17,
    title: 'ffffffffffffffffffffftion',
    description: 'Practice meditation for at least 10 minutes',
    date: '2024-11-10',
    status: 1,
  },
];

function Home() {
  const [userName, setUserName] = useState('Umayanga');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalender, setShowCalender] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskModal, setSelectedTaskModal] = useState(!false);

  useEffect(() => {
    getTodayDate();
  }, []);

  const getDate = () => {
    const date = new Date();
    setSelectedDate(date);
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

  const handleTaskClick = task => {
    setSelectedTask(task);
    setSelectedTaskModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={homeBackground} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              Hello {userName} <Text style={styles.waveHand}>👋</Text>
            </Text>
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
        />

        {selectedTask!=null && <View style={styles.modal}>
          <ViewTask
            date={selectedDate}
            task={selectedTask}
            setSelectedTaskModal={setSelectedTaskModal}
            selectedTaskModal={selectedTaskModal}
          />
        </View>}

        <ScrollView style={styles.scrollView}>
          <View style={styles.cardContainer}>
            {demoTasks.map(task => (
              <TouchableOpacity onPress={() => handleTaskClick(task)}>
                <TaskCard
                  title={task.title}
                  status={task.status}
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
    fontSize: 35,
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
    fontFamily: Platform.select({
      ios: 'Snell Roundhand',
      android: 'sans-serif-light',
    }),
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
    marginBottom: 15,
  },
});

export default Home;
