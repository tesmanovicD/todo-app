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
        if (!todo.title || !todo.description) return alert('Please enter job title and description')

        const createdAt = moment().format('DD-MM-YYYY HH:MM:SS');
        this.props.dispatch(actions.todos.addTodo({id: this.props.lastId + 1, ...todo, createdAt }))
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

const mapStateToProps = (state) => {
    return {
        lastId: state.todos.lastId
    }
}

export default connect(mapStateToProps)(AddTodo)
