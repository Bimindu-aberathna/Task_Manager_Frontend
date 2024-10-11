import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {View,Image} from 'react-native';

const closeIcon = require('../Assets/images/cross.png');

export default function CustomCalender({selectedDate, handleDateSelection,setShowCalender}) {
  return (
    <View>
        <Image
            source={closeIcon}
            style={{width: 35, height: 35, alignSelf: 'flex-end',marginRight: -30,marginTop: -30}}
            onPress={() => setShowCalender(false)}
        />
      <Calendar
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
  );
}
