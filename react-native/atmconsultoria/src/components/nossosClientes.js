import {View, Text, Image} from 'react-native';
import React from "react";
import {Component} from 'react';
import BarraSuperior from "./barraSuperior";

export default class NossosClientes extends Component {

    constructor(props) {
        super(props);
        this.nossosClientes = require('./../../resources/img/detalhe_cliente.png');
        this.cliente1 = require('./../../resources/img/cliente1.png');
        this.cliente2 = require('./../../resources/img/cliente2.png');
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <BarraSuperior voltar navigator={this.props.navigator} backgroundStatusBar="#B9C941"/>
                <View style={{
                    marginTop: 10,
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Image source={this.nossosClientes}/>
                    <Text style={{fontSize: 30, color: '#B9C941', marginLeft: 10}}>Nossos Clientes</Text>
                </View>
                <View style={{padding: 20, marginTop: 10}}>
                    <Image source={this.cliente1}/>
                    <Text style={{fontSize: 18, marginLeft: 20}}>Lorem Ipsum dolorem</Text>
                </View>
                <View style={{padding: 20, marginTop: 10}}>
                    <Image source={this.cliente2}/>
                    <Text style={{fontSize: 18, marginLeft: 20}}>Lorem Ipsum dolorem</Text>
                </View>
            </View>
        );
    }
}