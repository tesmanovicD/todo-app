import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Table, Row, Cell, TableWrapper } from 'react-native-table-component'

import styles from './todoList.style'
import actions from '../../modules/actions'
import ModalComponent from '../../containers/ModalComponent'
import EditTodo from '../EditTodo'

class TodoList extends Component {

    state = {
        tableHead: ['ID', 'Title', 'Descr.', 'Created', 'Action'],
        tableData: [],
        modalVisible: false
    }

    setModalVisible = (modalVisible) => {
        this.setState({modalVisible});
      }

    componentDidMount() {
        this.updateTableData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todos !== this.props.todos) {
            this.updateTableData();
        }
    }

    updateTableData = () => {
        var arr = []

        this.props.todos.forEach(element => arr.push([...Object.values(element), 1]))
        this.setState({tableData: arr})   
    }

    editTodo = (id) => {
        this.setState({ editId: id })
        this.setModalVisible(true)
    }

    toggleConfirmation = (type, id) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to ${type} an item`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Confirm', onPress: () => type == 'edit' ? this.editTodo(id) : this.deleteTodo(id) },
            ],
            { cancelable: false },
        );
    }

    deleteTodo = (id) => {
        this.props.dispatch(actions.todos.deleteTodo(id))
    }

    renderTableData = () => {
        if (this.state.tableData.length) {
            const element = item => (
                <View style={{flexDirection: 'column', marginHorizontal: 5}}>
                    <TouchableOpacity onPress={() => this.toggleConfirmation('edit', item[0])} style={{marginBottom: 5}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toggleConfirmation('delete', item[0])}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>    
            );

            return this.state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 4 ? element(rowData) : cellData} textStyle={styles.textStyle}/>
                    ))
                  }
                </TableWrapper>
            ))
        } else {
            return <TableWrapper style={{height: 20}}>
            <Cell data={"No results"} />
          </TableWrapper>
        }
    }

  render() {
    
    return (
        <View style={{flex: 1}}>
            <Table borderStyle={styles.borderStyle}>
                <Row data={this.state.tableHead} style={{height: 40}} textStyle={styles.textStyle}/>
                {this.renderTableData()}
            </Table>
            <ModalComponent setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible}>
                <EditTodo id={this.state.editId} setModalVisible={this.setModalVisible}/>
            </ModalComponent>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

export default connect(mapStateToProps)(TodoList)