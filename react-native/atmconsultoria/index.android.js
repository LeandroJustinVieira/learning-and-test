import React, {Component} from "react";
import { Navigator } from 'react-native-deprecated-custom-components';
import {AppRegistry} from 'react-native';


import MenuInicial from "./src/components/menuInicial";
import NossosClientes from "./src/components/nossosClientes";
import Contatos from "./src/components/contatos";

class AtmConsultoria extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator initialRoute={{id : 'menuInicial'}} renderScene={(route, navigator) => {
                if (route.id === 'menuInicial') {
                    return(<MenuInicial navigator={navigator}/>)
                }
                if (route.id === 'nossosClientes') {
                    return(<NossosClientes navigator={navigator} />)
                }
                if (route.id === 'contatos') {
                    return(<Contatos navigator={navigator} />)
                }
            }}/>
        );
    }
}
AppRegistry.registerComponent('atmconsultoria', () => AtmConsultoria);