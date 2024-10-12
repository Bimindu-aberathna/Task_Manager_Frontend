import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

const closeIcon = require('../Assets/images/cross.png');

function ViewTask({date, task, setSelectedTaskModal, selectedTaskModal}) {
  const [currentTask, setCurrentTask] = useState(task);

  const setTaskCompleted = () => {
    const updatedTask = {...currentTask, status: 1};
    setCurrentTask(updatedTask);
  };

  const setTaskIncomplete = () => {
    const updatedTask = {...currentTask, status: 0};
    setCurrentTask(updatedTask);
  };

  return (
    <View>
      <Modal isVisible={selectedTaskModal && task !== null}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setSelectedTaskModal(false)}
              style={styles.closeButton}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.Header}>View Task</Text>
            <Text style={styles.date}>{date}</Text>
            <View>
              <Text style={styles.label}>Title:</Text>
              <View style={styles.titleInputContainer}>
                <Text style={styles.inputText}>{task.title}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Description:</Text>
              <View style={styles.descriptionInputContainer}>
                <Text style={styles.inputText}>{task.description}</Text>
              </View>
            </View>
            {task.status === 0 && (
              <TouchableOpacity onPress={() => setTaskStatus(1)}>
                <Text style={styles.button}>Set Completed</Text>
              </TouchableOpacity>
            )}
            {task.status === 1 && (
              <TouchableOpacity onPress={() => setTaskStatus(0)}>
                <Text style={styles.button}>Set Incomplete</Text>
              </TouchableOpacity>
            )}
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
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 2,
  },
  closeIcon: {
    width: 35,
    height: 35,
  },
  titleInputContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    minHeight: 30,
  },
  descriptionInputContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    minHeight:70,
  },
  inputText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
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
});

export default ViewTask;
