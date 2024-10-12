import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const closeIcon = require('../Assets/images/cross.png');

export default function CustomCalender({
  selectedDate,
  handleDateSelection,
  setShowCalender,
  showCalender,
}) {
  return (
    <View style={styles.container}>
      <Modal isVisible={showCalender}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setShowCalender(false)} style={styles.closeButton}>
            <Image
              source={closeIcon}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Calendar
            style={styles.calendar}
            onDayPress={day => {
              handleDateSelection(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '92%',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingBottom:30
  },
  closeButton: {
    position: 'absolute',
    top: -18,
    right: -15,
    zIndex: 2,
  },
  closeIcon: {
    width: 35,
    height: 35,
  },
  calendar: {
    marginTop: 20,
    zIndex: 1,
    transform: [{ scale: 1.1 }],
  },
});