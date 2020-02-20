import React, {Component} from "react";
import {Image, View, Text, StyleSheet} from "react-native";
import Sound from 'react-native-sound';

export default class Cat extends Component {
    constructor(props) {
        super(props);
        this.gatinho = require('./../../resources/gatinho.jpeg');
        this.gatinhoDancando = require('./../../resources/gatinho_dancando.gif');
        
        const sound = new Sound('./../../resources/BabyShark.mp3', null, (error) => {
            if (error) {
              // do something
            }
            
            // play when loaded
            sound.play();
          });

    }

    render() {

        //SoundPlayer.playSoundFile('./../../resources/BabyShark', 'mp3');

        if (this.props.dance) {
            return (
                <View>
                    <Image source={this.gatinhoDancando}/>
                </View>
            );
        } 
        return (
            <View>
                <Image source={this.gatinho}/>
            </View>
        );
    }
}
