import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux'

import store from './src/modules/store'
import Home from './src/components/Home'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Home />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
