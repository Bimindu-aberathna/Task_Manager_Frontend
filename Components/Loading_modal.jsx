import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Gif from 'react-native-gif';

const loadingIcon = require('../Assets/images/loading.gif');

function Loading_modal() {
  return (
    <View>
      <Modal isVisible={true}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Gif
              source={loadingIcon}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Loading_modal;