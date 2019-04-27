import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from './home.style'
import AddTodo from '../AddTodo';
import TodoList from '../TodoList';

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home component</Text>
        <AddTodo/>
        <TodoList/>
      </View>
    )
  }
}

export default connect()(Home)