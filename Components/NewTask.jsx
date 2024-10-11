import React from 'react';
import {View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import {useState} from 'react';

const closeIcon = require('../Assets/images/cross.png');

function NewTask({date,NewTask,setShowNewTask}){
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  return (
    <View>
      <Modal isVisible={NewTask}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowNewTask(false)}>
                <Image source={closeIcon} style={{width: 35, height: 35, alignSelf: 'flex-end',marginRight: -30,marginTop: -30}}/>
            </TouchableOpacity>
            <Text style={styles.Header}>New Task</Text>
              <Text style={styles.date}>{date.date}</Text>
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
            <TouchableOpacity>
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
  },
    taskDescription: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
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

export default NewTask;
