import React, {Component} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import {Actions} from "react-native-router-flux";

type Props = {};
export default class Resultado extends Component<Props> {

    constructor(props) {
        super(props);
        this.cara = require('./../../resource/img/moeda_cara.png');
        this.coroa = require('./../../resource/img/moeda_coroa.png');

        this.state = {result: ''};
    }

    componentWillMount(): void {
        let result = (Math.floor(Math.random() * 2) === 0) ? 'cara' : 'coroa';
        this.setState({result: result});
    }

    render() {
        if (this.state.result === 'cara') {
            return (
                <View style={style.viewPrincipal}>
                    <View style={style.viewImage}>
                        <TouchableHighlight onPress={() => Actions.pop()}>
                            <Image source={this.cara}/>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        return (
            <View style={style.viewPrincipal}>
                <View style={style.viewImage}>
                    <TouchableHighlight onPress={() => Actions.cenaPrincipal()}>
                        <Image source={this.coroa}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const style = {
    viewPrincipal: {
        flex: 1,
        backgroundColor: '#61BD8C'
    },
    viewImage: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
};