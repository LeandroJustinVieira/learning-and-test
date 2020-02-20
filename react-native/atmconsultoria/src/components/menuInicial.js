import {View, Image, TouchableHighlight, Button, ScrollView} from 'react-native';
import React from "react";
import {Component} from 'react';
import BarraSuperior from "./barraSuperior";

export default class MenuInicial extends Component {

    constructor(props) {
        super(props);
        this.logo = require('./../../resources/img/logo.png');
        this.menuContato = require('./../../resources/img/menu_contato.png');
        this.menuEmpresa = require('./../../resources/img/menu_empresa.png');
        this.menuCliente = require('./../../resources/img/menu_cliente.png');
        this.menuServico = require('./../../resources/img/menu_servico.png');
    }

    render() {
        return (
            <ScrollView>
                <BarraSuperior navigator={this.props.navigator} backgroundStatusBar="gray"/>
                <View style={{marginTop: 10, justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <Image source={this.logo}/>
                </View>
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{marginTop: 10, display: 'flex', flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor={'#B9C941'} activeOpacity={0.6} onPress={() => {this.props.navigator.push({id: 'nossosClientes'})}}>
                            <Image style={{margin: 10}} source={this.menuCliente}/>
                        </TouchableHighlight>
                        <TouchableHighlight  underlayColor={'#61bd8c'} activeOpacity={0.6} onPress={() => {this.props.navigator.push({id: 'contatos'})}}>
                            <Image style={{margin: 10}} source={this.menuContato}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop: 10, display: 'flex', flexDirection: 'row'}}>
                        <Image style={{margin: 10}} source={this.menuEmpresa}/>
                        <Image style={{margin: 10}} source={this.menuServico}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}