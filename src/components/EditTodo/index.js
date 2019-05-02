import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import actions from '../../modules/actions'
import styles from './editTodo.style'

class EditTodo extends Component {

    state = {
        title: '',
        description: ''
    }

    componentDidMount() {
        const item = this.props.todos.find(t => t.id == this.props.id)

        this.setState({ title: item.title, description: item.description })
    }

    submitEdit = () => {
        const { title, description } = this.state
        const createdAt = moment().format('DD-MM-YYYY HH:MM:SS');

        if (!title || !description) return alert('Please enter job title and description')

        this.props.dispatch(actions.todos.editTodo({ id: this.props.id, title, description, createdAt }))
        this.props.setModalVisible(false)
        alert("Succesfully edited")
    }
  render() {
    return (
      <View>
          <View style={styles.inputWrapper}>
                <Text>Job title:</Text>
                <TextInput
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    placeholder="Enter title"
                    style={styles.textInput}
                ></TextInput>
            </View>

            <View style={styles.inputWrapper}>
                <Text>Job description:</Text>
                <TextInput
                    onChangeText={(description) => this.setState({ description})}
                    value={this.state.description}
                    placeholder="Describe your job"
                    style={styles.textInput}
                ></TextInput>
            </View>

            <TouchableOpacity onPress={() => this.submitEdit()} style={styles.confirmBtn}>
                <View><Text style={styles.btnText}>Confirm</Text></View>
            </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

export default connect(mapStateToProps)(EditTodo)
