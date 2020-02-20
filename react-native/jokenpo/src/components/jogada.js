import React, {Component} from "react";
import {Image, View, Text, StyleSheet} from "react-native";

class Jogada extends Component {
    constructor(props) {

        // this.props.nomeJogador;
        // this.props.jogada;
        super(props);
        this.pedra = require('./../../resource/pedra.png');
        this.papel = require('./../../resource/papel.png');
        this.tesoura = require('./../../resource/tesoura.png');
    }

    render() {
        if (this.props.jogada === 'Pedra') {
            return (
                <View>
                    <Text>{this.props.nomeJogador}</Text>
                    <Image source={this.pedra}/>
                </View>
            );
        } else if (this.props.jogada === 'Papel') {
            return (
                <View>
                    <Text>{this.props.nomeJogador}</Text>
                    <Image source={this.papel}/>
                </View>
            );
        } else if (this.props.jogada === 'Tesoura') {
            return (
                <View style={styles.view}>
                    <Text style={styles.textNomeJogador}>{this.props.nomeJogador}</Text>
                    <Image source={this.tesoura}/>
                </View>
            );
        }
        return false;
    }
}
const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    },
    textNomeJogador: {
        fontSize: 18
    }
});
export default Jogada;
