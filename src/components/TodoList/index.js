import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Table, Row, Cell, TableWrapper } from 'react-native-table-component';


import styles from './todoList.style'

class TodoList extends Component {

    state = {
        tableHead: ['ID', 'Title', 'Descr.', 'Created', 'Action'],
        tableData: []
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
        alert("edit "+id)
    }

    deleteTodo = (id) => {
        alert("delete "+id)
    }

    renderTableData = () => {
        if (this.state.tableData.length) {
            const element = item => (
                <View style={{flexDirection: 'column', marginHorizontal: 5}}>
                    <TouchableOpacity onPress={() => this.editTodo(item[0])} style={{marginBottom: 5}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteTodo(item[0])}>
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