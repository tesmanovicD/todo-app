import React from 'react'
import { Text, View, Modal, TouchableHighlight } from 'react-native'

const ModalComponent = (props) => (
  <Modal
  animationType="slide"
  transparent={false}
  visible={props.modalVisible}
  >
  <View>
      <TouchableHighlight
        style={{alignSelf: 'flex-end', padding: 10, paddingBottom: 0}}
        onPress={() => props.setModalVisible(false)}>
        <Text>X</Text>
      </TouchableHighlight>
    </View>
  <View style={{marginTop: 22}}>
    {props.children}
  </View>
</Modal>
)

export default ModalComponent
