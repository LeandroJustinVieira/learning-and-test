import React from "react";
import {View, Text, StatusBar, Image, TouchableHighlight} from 'react-native';
import {Component} from 'react';

export default class BarraSuperior extends Component {

    constructor(props) {
        super(props);
        this.btnVoltar = require('./../../resources/img/btn_voltar.png');
    }

    render() {
        if (this.props.voltar) {
            return (
                <View style={{flexDirection: 'row', backgroundColor: this.props.backgroundStatusBar, height: 60, alignItems: 'center'}}>


                   <!--TODO aplicar efeito fade?-->
                    <StatusBar backgroundColor={this.props.backgroundStatusBar} animated/>
                    <TouchableHighlight  underlayColor={this.props.backgroundStatusBar} activeOpacity={0.6} onPress={() => {this.props.navigator.pop()}}>
                        <Image style={{marginLeft: 10}} source={this.btnVoltar}/>
                    </TouchableHighlight>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>ATM
                            Consultoria</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{flexDirection: 'row', backgroundColor: 'gray', height: 60, alignItems: 'center'}}>
                <StatusBar backgroundColor={this.props.backgroundStatusBar} setBackgroundColor={this.props.backgroundStatusBar}/>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>ATM
                        Consultoria</Text>
                </View>
            </View>
        );
    }
}