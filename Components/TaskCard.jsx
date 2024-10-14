import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const pendingIcon = require('../Assets/images/pending.png');
const completedIcon = require('../Assets/images/completed.png');

function TaskCard({title, status}) {
  return (
    <View
      style={[
        styles.card,
        status === 1 && {opacity: 0.5},
      ]}>
      <Text
        numberOfLines={1}
        style={styles.task}>
        {title}
      </Text>
      <Image
        source={status === 0 ? pendingIcon : completedIcon}
        style={styles.cardIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    width: '100%',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginLeft: 5,
    marginRight: 5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 2,
    transform: [{scale: 0.9}],
  },
  task: {
    fontSize: 20,
    flex: 1,
    marginRight: 10,
    color: 'black',
  },
  cardIcon: {
    width: 30,
    height: 30,
  },
});

export default TaskCard;