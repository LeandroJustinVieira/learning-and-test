import React, {Component} from 'react';
import Routes from "./Routes";

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes/>
        );
    }
}