/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, Button} from 'react-native';
import Cat from './src/components/cat';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {dance: false};
  }

  dance() {
    this.setState({dance: !this.state.dance});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
        </View>
        <Cat dance={this.state.dance}/>
        <Button title="Dança" onPress={() => {this.dance()}} />
        <Button title="Jogos" onPress={() => {this.dance()}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
