import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import styles from './home.style'
import AddTodo from '../AddTodo';
import TodoList from '../TodoList';
import ModalComponent from '../../containers/ModalComponent'

class Home extends Component {

  state = {
    modalVisible: false,
    searchedTerm: '',
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.headingText}>Todo app</Text>
        <TouchableHighlight onPress={() => this.setModalVisible(true)}>
          <Text style={styles.addTodoBtn}>Add new todo</Text>
        </TouchableHighlight>
        <View>
          <Text>Search todo</Text>
          <TextInput
            onChangeText={(searchedTerm) => this.setState({ searchedTerm })}
            value={this.state.searchedTerm}
            placeholder="Enter word (min 3 chars)"
          />
        </View>
        <Text style={styles.todosText}>List of current todos</Text>
        <TodoList searchedTerm={this.state.searchedTerm}/>

        <ModalComponent setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible}>
          <AddTodo setModalVisible={this.setModalVisible}/>
        </ModalComponent>
         
      </View>
    )
  }
}

export default connect()(Home)