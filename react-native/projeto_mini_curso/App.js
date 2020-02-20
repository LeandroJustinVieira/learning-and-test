/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button, Image} from 'react-native';
import Sound from 'react-native-sound';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.gatinho = require("./resources/gatinho.jpeg");
    this.gatinhoDancando = require("./resources/gatinho_dancando.gif");
    this.state = {danca : false};
  }

  dancar() {
    this.setState({danca : !this.state.danca});
  }
  
  render() {
    if (this.state.danca) {
      var musica = new Sound('babyshark.mp3',
        Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }   
          musica.play();
      });
      return ( 
        <ScrollView style={styles.container}>
          <Image source={this.gatinhoDancando} />
          <Button title="botao" onPress={() => {this.dancar()}}/>
        </ScrollView>
      );
    }
    return ( 
      <ScrollView>
        <Image source={this.gatinho} />
        <Button title="botao" onPress={() => {this.dancar()}}/>
      </ScrollView>
    );
  }
}
//src
//resource

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
