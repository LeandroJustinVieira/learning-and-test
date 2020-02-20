import {View, Text, AppRegistry, Button, Image, StyleSheet} from 'react-native';
import React from "react";
import {Component} from 'react';
import Topo from "./src/components/topo";
import Jogada from "./src/components/jogada";

class jokenpo extends Component {

    constructor(props) {
        super(props);
        this.state = {escolhaUsuario: '', escolhaComputador: '', resultado: ''};
    }

    jokenpo(escolhaUsuario) {

        let escolhaComputador = '';
        let resultado = '';
        let numAleatorio = Math.floor(Math.random() * 3);
        switch (numAleatorio) {
            case 0:
                escolhaComputador = 'Pedra';
                break;
            case 1:
                escolhaComputador = 'Papel';
                break;
            case 2:
                escolhaComputador = 'Tesoura';
                break;
        }
        if (escolhaComputador === 'Pedra') {
            if (escolhaUsuario === 'Pedra') {
                resultado = 'Empate!';
            }
            if (escolhaUsuario === 'Papel') {
                resultado = "Você Ganhou!";
            }
            if (escolhaUsuario == 'Tesoura') {
                resultado = "Você perdeu!";
            }
        }
        if (escolhaComputador == 'Papel') {
            if (escolhaUsuario == 'Papel') {
                resultado = 'Empate!';
            }
            if (escolhaUsuario == 'Tesoura') {
                resultado = "Você ganhou!";
            }
            if (escolhaUsuario == 'Pedra') {
                resultado = "Você perdeu!";
            }
        }
        if (escolhaComputador == 'Tesoura') {
            if (escolhaUsuario == 'Tesoura') {
                resultado = 'Empate!';
            }
            if (escolhaUsuario == 'Pedra') {
                resultado = "Você ganhou!";
            }
            if (escolhaUsuario == 'Papel') {
                resultado = "Você perdeu!";
            }
        }
        this.setState({escolhaUsuario, escolhaComputador, resultado});
    }

    render() {
        return (
            <View>
                <Topo/>
                <View style={styles.panel}>
                    <View style={styles.btn}>
                        <Button title='pedra' onPress={() => {
                            this.jokenpo('Pedra')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title='papel' onPress={() => {
                            this.jokenpo('Papel')
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title='tesoura' onPress={() => {
                            this.jokenpo('Tesoura')
                        }}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.textResult}>{this.state.resultado}</Text>
                    <View style={styles.viewJogadas}>
                        <Jogada nomeJogador="Você" jogada={this.state.escolhaUsuario}/>
                        <Jogada nomeJogador="CPU" jogada={this.state.escolhaComputador}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 90
    },
    panel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    textResult: {
        fontSize: 20,
        height: 60,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    viewJogadas: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('jokenpo', () => jokenpo);