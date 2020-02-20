import React, { Component} from "react";
import {Image, View} from "react-native";

class Topo extends Component {
    constructor(props) {
        super(props);
        this.jokenpo = require('./../../resource/jokenpo.png');
    }
    render() {
        return (
            <View>
                <Image source={this.jokenpo}/>
            </View>
        );
    }
}
export default Topo;