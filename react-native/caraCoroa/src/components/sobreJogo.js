import React, {Component} from 'react';
import {Text, View} from 'react-native';

type Props = {};
export default class SobreJogo extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.viewPrincipal}>
                <View style={style.viewText}>
                    <Text style={style.text}>Sobre o jogo!</Text>
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
    viewText: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff'
    }
};