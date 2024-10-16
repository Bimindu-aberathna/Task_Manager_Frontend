import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {useState} from 'react';
import axios from 'axios';

const closeIcon = require('../Assets/images/cross.png');

function NewTask({date, NewTask, setShowNewTask, getUserTasks}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [taskTitle, taskDescription]);

  const validateTask = title => {
    if (title.length < 3) {
      setError('Title must be at least 3 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateTask(taskTitle)) return;

    try {
      await axios.post('/task/new', {
        title: taskTitle,
        description: taskDescription,
        due_date: date,
      });
      console.log({title: taskTitle, description: taskDescription, due_date: date});
      getUserTasks();
      setShowNewTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Modal isVisible={NewTask}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowNewTask(false)}>
              <Image
                source={closeIcon}
                style={{
                  width: 35,
                  height: 35,
                  alignSelf: 'flex-end',
                  marginRight: -30,
                  marginTop: -30,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.Header}>New Task</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={[styles.error, {display: error ? 'block' : 'none'}]}>
              {error}
            </Text>
            <View>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the Title"
                value={taskTitle}
                onChangeText={text => setTaskTitle(text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                editable
                multiline
                numberOfLines={5}
                maxLength={100}
                onChangeText={text => setTaskDescription(text)}
                value={taskDescription}
                style={styles.taskDescription}
              />
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
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
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
  taskDescription: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: 'black',
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  date: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: 'gray',
  },
  button: {
    backgroundColor: '#f24ec4',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: -15,
  },
});

export default NewTask;
