import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
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
        modalVisible: false,
        pageNumbers: [],
        currentPage: 1,
        perPage: 5,
    }

    setModalVisible = (modalVisible) => {
        this.setState({modalVisible});
      }

    componentWillMount() {
        this.updateTableData();
    }

    componentDidMount() {
        this.updateTableData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todos !== this.props.todos || prevProps.searchedTerm !== this.props.searchedTerm) {
            this.updateTableData();
        }
    }

    getPageNumbers() {
        this.state.pageNumbers = [];

        for (let i = 1; i <= Math.ceil((this.state.tableData.length + 1) / this.state.perPage); i++) {
          this.state.pageNumbers.push(i);
        }
    }

    pageNumberClick = (currentPage) => {
        this.setState({currentPage})
    }

    updateTableData = () => {
        var arr = []
        const { searchedTerm, todos } = this.props

        if (searchedTerm.length != '') {
            todos.forEach(element => {
                if(element['title'].includes(searchedTerm) || element['description'].includes(searchedTerm)) {
                    arr.push([...Object.values(element), 1]) 
                }
            })

        } else {
            todos.forEach(element => arr.push([...Object.values(element), 1]))
        }

        this.setState({tableData: arr})
        this.getPageNumbers();
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
            const { currentPage, perPage } = this.state;
            const limit = currentPage *  perPage;
            const offset = (currentPage * perPage) - perPage

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

            const detailsPage = id => (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DetailsPage', {id})}>
                    <Text>{id}</Text>
                </TouchableOpacity>
            )
            

            return this.state.tableData.slice(offset, limit).map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 0 ? detailsPage(cellData) : (cellIndex === 4 ? element(rowData) : cellData)} textStyle={styles.textStyle}/>
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

    const paginationList = this.state.pageNumbers.map(pageNumber =>
        <TouchableHighlight onPress={() => this.pageNumberClick(pageNumber)}><Text>{pageNumber}</Text></TouchableHighlight>
    )
    
    return (
        <View style={{flex: 1}}>
            <Table borderStyle={styles.borderStyle}>
                <Row data={this.state.tableHead} style={{height: 40}} textStyle={styles.textStyle}/>
                {this.renderTableData()}
            </Table>
            <View style={{flexDirection: 'row'}}>
                {this.state.pageNumbers.length > 1 ? paginationList : <Text></Text>}  
            </View>
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