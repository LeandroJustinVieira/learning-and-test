import {View, Text, Image} from 'react-native';
import React from "react";
import {Component} from 'react';
import BarraSuperior from "./barraSuperior";

export default class Contatos extends Component {

    constructor(props) {
        super(props);
        this.contatos = require('./../../resources/img/detalhe_contato.png');
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <BarraSuperior voltar navigator={this.props.navigator} backgroundStatusBar="#61bd8c"/>
                <View style={{
                    marginTop: 10,
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Image source={this.contatos}/>
                    <Text style={{fontSize: 30, color: '#61bd8c', marginLeft: 10}}>Contatos</Text>
                </View>
                <View style={{padding: 20, marginTop: 10}}>
                    <Text style={{fontSize: 18, marginLeft: 20}}>TEL (48) 99820-7802</Text>
                    <Text style={{fontSize: 18, marginLeft: 20}}>CEL (48) 99820-7802</Text>
                    <Text style={{fontSize: 18, marginLeft: 20}}>EMAIL: leandrojv83@gmail.com</Text>
                </View>
            </View>
        );
    }
}