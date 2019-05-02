import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class DetailsPage extends Component {

    state = {
        id: undefined
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id', undefined);

        this.setState({ id })
    }

    renderDetails = () => {
        const { id } = this.state

        if (!id) {
            return <Text>No results</Text>
        } else {
            let item = this.props.todos.find(t=> t.id == id);

            return <View>
                <Text>ID: {item.id}</Text>
                <Text>Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Created at: {item.createdAt}</Text>
            </View>
        }
    }
  render() {
    return (
      <View>
        {this.renderDetails()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

export default connect(mapStateToProps)(DetailsPage)
