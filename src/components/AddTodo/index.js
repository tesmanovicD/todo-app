import React, { Component } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import actions from '../../modules/actions'
import styles from './addTodo.style'

class AddTodo extends Component {

    state = {
        title: '',
        description: '',
    }

    addTodo = (todo) => {
        this.props.dispatch(actions.todos.addTodo({...todo, createdAt: moment().format('DD-MM-YYYY HH:MM:SS')}))
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

                <TouchableOpacity onPress={() => this.addTodo(this.state)} style={styles.confirmBtn}>
                    <View><Text style={styles.btnText}>Add todo</Text></View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddTodo)
