import React, {Component} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';

type Props = {};
export default class CenaPrincipal extends Component<Props> {

    constructor(props) {
        super(props);

        this.logo = require('./../../resource/img/logo.png');
        this.btnJogar = require('./../../resource/img/botao_jogar.png');
        this.btnSobreJogo = require('./../../resource/img/sobre_jogo.png');
        this.btnOutrosJogo = require('./../../resource/img/outros_jogos.png');
    }

    render() {
        return (
            <View style={style.viewPrincipal}>
                <View style={style.viewApresentacaoJogo}>
                    <Image source={this.logo}/>
                    <TouchableHighlight onPress={() => Actions.jogar()}>
                        <Image source={this.btnJogar}/>
                    </TouchableHighlight>
                </View>
                <View style={style.rodape}>
                    <TouchableHighlight onPress={() => Actions.sobrejogo()}>
                        <Image source={this.btnSobreJogo}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Actions.outrosjogos()}>
                        <Image source={this.btnOutrosJogo}/>
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
    viewApresentacaoJogo: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rodape: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};