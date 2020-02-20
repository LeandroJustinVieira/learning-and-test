// Buscar do node modules a lib do react

import React from 'react';
import {Text, View, Button, AppRegistry, TouchableOpacity} from 'react-native';

const style = {
    text: {
    },
    view: {
        paddingTop: 40
    },
    button: {
        margin:5,
        backgroundColor: "purple",
        padding: 10,
        borderColor: "rebeccapurple",
        borderWidth: 1,
        borderRadius: 19,


    },
    textButton: {
        color: '#fff',
        alignSelf: "center",
        fontSize: 16,
        fontWeight: 'bold'
    },
};

const buttonPress = () => {
  alert("Click!");
};

const App = () => {
    return (
        <View style={style.view}>
            <TouchableOpacity style={style.button}>
                <Text style={style.textButton}>Clique aqui!</Text>
            </TouchableOpacity>
        </View>
    );
};
AppRegistry.registerComponent('frasesdodia', () => App);
